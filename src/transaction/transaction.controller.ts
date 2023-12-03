import { Body, Controller,Delete,Get,Param,Post, Put,Query,Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { TransactionService } from './transaction.service';
import { Transaction } from './schema/transaction.schema';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SearchDto } from './dto/keyword-search.dto';
import { Roles } from 'src/auth/custom_decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('transaction')
export class TransactionController {
    constructor (private transactionService:TransactionService,){
    }

  @Get('all-transaction')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
    async getAllTransaction(@Query() query:ExpressQuery):Promise<Transaction[]>{
        return this.transactionService.findAll(query)
    }
   

  @Post('add-transaction')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('buyer','admin')
async createTransaction(
        @Body()
        transaction:CreateTransactionDto):Promise<string>{

    return this.transactionService.create(transaction,);
    }
    

  @Get(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
    async getTransaction(
        @Param('id') id:string
    ):Promise<Transaction>{
        return this.transactionService.findById(id);
    }

      @Get('search')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin','buyer')
  async search(@Body() searchDto:SearchDto):Promise<any>{
       return await this.transactionService.search(searchDto.keyword);
    }

     @Put(':id')
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin')
    async updateTransaction(
        @Param('id')
        id:string,
        @Body()
         transaction:UpdateTransactionDto):Promise<Transaction>{
    return this.transactionService.updateById(id,transaction);
    }
   
     @Delete(':id')
     
@UseGuards(AuthGuard(),RolesGuard)
@Roles('admin')
    async deleteTransaction(
        @Param('id') id:string
    ):Promise<string>{
        return this.transactionService.deleteById(id);
    }
}
