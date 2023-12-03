import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Product } from "src/product/schema/product.schema";


@Schema({
    collection:"cart",
    timestamps:true
})export class Cart{
    



@Prop([{type: mongoose.Schema.Types.ObjectId, ref:Product.name} ])
products: Product[]


@Prop()
userId: string

}
export const CartSchema = SchemaFactory.createForClass(Cart);
