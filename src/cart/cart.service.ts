import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import {Cart} from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name)
        private cartModel: mongoose.Model<Cart>
    ) {}

  async findAll(query: Query): Promise<Cart[]> {
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
          { $lookup: { from: "product", localField: "products", foreignField: "_id", as: "products" } },
          { $unwind: "$products" },
          { $limit: resPerPage },
          { $skip: skip },
          // Add your additional aggregation stages here if needed
      ];
        const cart = await this.cartModel.aggregate(aggregationPipeline).exec();

        
        return cart;
    }

  async create(cart: CreateCartDto,): Promise<string> {
const  res = await  this.cartModel.create(cart);
        return "Successfully added !";
    }

    async createAndFetchId(cart: CreateCartDto): Promise<string> {
        const  res = await this.cartModel.create(cart);
        return res.id;
    }

  async findById(id: string): Promise<Cart> {
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new NotFoundException('Please enter correct id');
        }
        const cart = await this.cartModel.findById(id);

        if (!cart) {
            throw new NotFoundException('Not found !');
        }
        return cart;
    }

      async search(keyword:string):Promise<any>{
    const results = await this.cartModel.find({
        $or:[{products: { $regex: keyword, $options: 'i' } },
{userId: { $regex: keyword, $options: 'i' } },
		]
      });
      return results;
    }

  async updateById(id: string, cart: UpdateCartDto): Promise<Cart> {
        return await this.cartModel.findByIdAndUpdate(id, cart, {
            new: true,
            runValidators: true
        });
    }

  async deleteById(id: string): Promise<string> {
         await this.cartModel.findByIdAndDelete(id);
         return "Successfully Deleted !";
    }
}
