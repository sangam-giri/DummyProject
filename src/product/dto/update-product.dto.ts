import { IsOptional,IsString,IsNumber} from "class-validator";



export class UpdateProductDto{
    


@IsOptional()
@IsString()
readonly productName:string;
@IsOptional()
@IsNumber()
readonly productPrice:number;
@IsOptional()
@IsString()
readonly productDesc:string;

}
