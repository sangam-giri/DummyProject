import { IsOptional,IsString} from "class-validator";



export class UpdateTransactionDto{
    

@IsOptional()
@IsString()
readonly cartId:string;
@IsOptional()
@IsString()
readonly userId:string;

}
