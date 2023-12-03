import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Cart } from "src/cart/schema/cart.schema";


@Schema({
    collection:"transaction",
    timestamps:true
})export class Transaction{
    



@Prop({type: mongoose.Schema.Types.ObjectId, ref:Cart.name} )
cartId: Cart


@Prop()
userId: string

}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
