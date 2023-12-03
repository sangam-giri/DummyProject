import { Body, Controller,Delete,Get,Param,Post, Put,Query,Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchDto } from './dto/keyword-search.dto';
import { Roles } from 'src/auth/custom_decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('product')
export class ProductController {
    constructor (private productService:ProductService,){
    }

  @Get('all-product')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','vendor','buyer')
    async getAllProduct(@Query() query:ExpressQuery):Promise<Product[]>{
        return this.productService.findAll(query)
    }
   

  @Post('add-product')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','vendor')
async createProduct(
        @Body()
        product:CreateProductDto):Promise<string>{

    return this.productService.create(product,);
    }
    

  @Get(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','vendor','buyer')
    async getProduct(
        @Param('id') id:string
    ):Promise<Product>{
        return this.productService.findById(id);
    }

      @Get('search')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','vendor','buyer')
  async search(@Body() searchDto:SearchDto):Promise<any>{
       return await this.productService.search(searchDto.keyword);
    }

     @Put(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('vendor','admin')
    async updateProduct(
        @Param('id')
        id:string,
        @Body()
         product:UpdateProductDto):Promise<Product>{
    return this.productService.updateById(id,product);
    }
   
     @Delete(':id')
     
@UseGuards(AuthGuard(),RolesGuard)
@Roles('vendor','admin')
    async deleteProduct(
        @Param('id') id:string
    ):Promise<string>{
        return this.productService.deleteById(id);
    }
}
