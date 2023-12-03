import {IsNotEmpty,IsOptional, IsString, MinLength} from "class-validator";
import { UserRole } from "../enums/role.enum";

export class SignUpDto{
    
    @IsNotEmpty()
    @IsString()
    readonly name:string;
    @IsNotEmpty()
    @IsString()
    readonly email:string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string;
    @IsNotEmpty()
    @IsString()
    readonly role:UserRole;
    @IsOptional()
    @IsString()
    readonly profile:string;
}
