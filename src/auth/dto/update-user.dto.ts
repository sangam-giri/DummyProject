import { IsString, IsOptional, MinLength} from "class-validator";
import { UserRole } from "../enums/role.enum";

export class UpdateUserDto{
    
  @IsOptional()
  @IsString()
  readonly name:string

  @IsOptional()
  @IsString()
  readonly email:string

  @IsOptional()
  @IsString()
  readonly role:UserRole

  @IsOptional()
  @IsString()
  readonly profile:string

}
