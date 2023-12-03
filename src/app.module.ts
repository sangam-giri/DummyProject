import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './file_upload/files.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    FilesModule,
    ProductModule,
		CartModule,
		TransactionModule,
    AuthModule
  ],
})
export class AppModule {}
