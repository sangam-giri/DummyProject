import { Body, Controller,Delete,Get,Param,Post, Put,Query,Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CartService } from './cart.service';
import { Cart } from './schema/cart.schema';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { SearchDto } from './dto/keyword-search.dto';
import { Roles } from 'src/auth/custom_decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('cart')
export class CartController {
    constructor (private cartService:CartService,){
    }

  @Get('all-cart')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
    async getAllCart(@Query() query:ExpressQuery):Promise<Cart[]>{
        return this.cartService.findAll(query)
    }
   

  @Post('add-cart')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
async createCart(
        @Body()
        cart:CreateCartDto):Promise<string>{

    return this.cartService.create(cart,);
    }
    

  @Get(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
    async getCart(
        @Param('id') id:string
    ):Promise<Cart>{
        return this.cartService.findById(id);
    }

      @Get('search')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
  async search(@Body() searchDto:SearchDto):Promise<any>{
       return await this.cartService.search(searchDto.keyword);
    }

     @Put(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin')
    async updateCart(
        @Param('id')
        id:string,
        @Body()
         cart:UpdateCartDto):Promise<Cart>{
    return this.cartService.updateById(id,cart);
    }
   
     @Delete(':id')
     
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin')
    async deleteCart(
        @Param('id') id:string
    ):Promise<string>{
        return this.cartService.deleteById(id);
    }
}
