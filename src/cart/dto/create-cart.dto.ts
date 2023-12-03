import {IsNotEmpty,IsArray,IsString} from "class-validator";



export class CreateCartDto{
    

@IsNotEmpty()
@IsArray()
readonly products:any[];
@IsNotEmpty()
@IsString()
readonly userId:string;

}
