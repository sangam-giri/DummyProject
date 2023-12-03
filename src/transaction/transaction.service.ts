import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import {Transaction} from './schema/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: mongoose.Model<Transaction>
    ) {}

  async findAll(query: Query): Promise<Transaction[]> {
  const resPerPage = 10
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: {
                regex: query.keyword,
                options: 'i'
            }
        } : {}
   const aggregationPipeline = [
          { $match: { ...keyword } },
          { $lookup: { from: "cart", localField: "cartid", foreignField: "_id", as: "cartid" } },
          { $unwind: "$cartid" },
          { $limit: resPerPage },
          { $skip: skip },
          // Add your additional aggregation stages here if needed
      ];
        const transaction = await this.transactionModel.aggregate(aggregationPipeline).exec();

        
        return transaction;
    }

  async create(transaction: CreateTransactionDto,): Promise<string> {
const  res = await  this.transactionModel.create(transaction);
        return "Successfully added !";
    }

    

  async findById(id: string): Promise<Transaction> {
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new NotFoundException('Please enter correct id');
        }
        const transaction = await this.transactionModel.findById(id);

        if (!transaction) {
            throw new NotFoundException('Not found !');
        }
        return transaction;
    }

      async search(keyword:string):Promise<any>{
    const results = await this.transactionModel.find({
        $or:[{cartId: { $regex: keyword, $options: 'i' } },
{userId: { $regex: keyword, $options: 'i' } },
		]
      });
      return results;
    }

  async updateById(id: string, transaction: UpdateTransactionDto): Promise<Transaction> {
        return await this.transactionModel.findByIdAndUpdate(id, transaction, {
            new: true,
            runValidators: true
        });
    }

  async deleteById(id: string): Promise<string> {
         await this.transactionModel.findByIdAndDelete(id);
         return "Successfully Deleted !";
    }
}
