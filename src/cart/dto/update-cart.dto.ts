import { IsOptional,IsArray,IsString} from "class-validator";



export class UpdateCartDto{
    

@IsOptional()
@IsArray()
readonly products:any[];
@IsOptional()
@IsString()
readonly userId:string;

}
