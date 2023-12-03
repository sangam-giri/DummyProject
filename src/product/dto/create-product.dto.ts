import {IsNotEmpty,IsString,IsNumber,IsOptional} from "class-validator";



export class CreateProductDto{
    


@IsNotEmpty()
@IsString()
readonly productName:string;
@IsNotEmpty()
@IsNumber()
readonly productPrice:number;
@IsOptional()
@IsString()
readonly productDesc:string;

}
