import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import {Product} from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ) {}

  async findAll(query: Query): Promise<Product[]> {
  const resPerPage = 20
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)

        const keyword = query.keyword ? {
            title: {
                regex: query.keyword,
                options: 'i'
            }
        } : {}
const product = await    this.productModel.find();
        
        return product;
    }

  async create(product: CreateProductDto,): Promise<string> {
const  res = await  this.productModel.create(product);
        return "Successfully added !";
    }

    async createAndFetchId(product: CreateProductDto): Promise<string> {
        const  res = await this.productModel.create(product);
        return res.id;
    }

  async findById(id: string): Promise<Product> {
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new NotFoundException('Please enter correct id');
        }
        const product = await this.productModel.findById(id);

        if (!product) {
            throw new NotFoundException('Not found !');
        }
        return product;
    }

      async search(keyword:string):Promise<any>{
    const results = await this.productModel.find({
        $or:[{productName: { $regex: keyword, $options: 'i' } },
{productPrice: { $regex: keyword, $options: 'i' } },
{productDesc: { $regex: keyword, $options: 'i' } },
		]
      });
      return results;
    }

  async updateById(id: string, product: UpdateProductDto): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true
        });
    }

  async deleteById(id: string): Promise<string> {
         await this.productModel.findByIdAndDelete(id);
         return "Successfully Deleted !";
    }
}
