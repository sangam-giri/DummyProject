import {IsNotEmpty,IsString} from "class-validator";



export class CreateTransactionDto{
    

@IsNotEmpty()
@IsString()
readonly cartId:string;
@IsNotEmpty()
@IsString()
readonly userId:string;

}
