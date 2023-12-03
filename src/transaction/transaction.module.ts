import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TransactionSchema } from './schema/transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
//This is where we have imported 


@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([{name:'Transaction',schema:TransactionSchema}]),
  //Place all your imports here
   
  ],
  controllers: [TransactionController],
  providers: [TransactionService,]
})
export class TransactionModule {}
