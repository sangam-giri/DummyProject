import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../enums/role.enum";

@Schema({
 timestamps:true   
})

export class User {
    
    @Prop()
    name:string
    @Prop()
    email:string
    @Prop()
    password:string
    @Prop()
    role:UserRole
    @Prop()
    profile:string
}

export const UserSchema = SchemaFactory.createForClass(User)
