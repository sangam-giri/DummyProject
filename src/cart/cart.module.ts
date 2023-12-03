import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CartSchema } from './schema/cart.schema';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
//This is where we have imported 


@Module({
  imports:[AuthModule,
    MongooseModule.forFeature([{name:'Cart',schema:CartSchema}]),
  //Place all your imports here
   
  ],
  controllers: [CartController],
  providers: [CartService,]
})
export class CartModule {}
