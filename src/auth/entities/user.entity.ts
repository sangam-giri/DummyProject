import { Prop} from "@nestjs/mongoose";
import { UserRole } from "../enums/role.enum";


export class UserEntity{

    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    role:UserRole

    @Prop()
    profile:string
}
