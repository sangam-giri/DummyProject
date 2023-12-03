import { Body,Headers, Controller,Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/user.schema';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body() signUpDto:SignUpDto):Promise<any>{
return this.authService.signUp(signUpDto)
    }

    @Post('/login')
    login(@Body() loginDto:any):Promise<any>{
return this.authService.login(loginDto)
    }

    @Get('/user')
    @UseGuards(AuthGuard())
    user(@Headers() headers: any) :Promise<any>{
        return this.authService.user(headers)
    }

    @Get('/all-user')
    @UseGuards(AuthGuard())
    allUser() :Promise<User[]>{
        return this.authService.allUser()
    }

    @Put("/update-user")
    @UseGuards(AuthGuard())
    updateUser(@Headers() headers: any,@Body() updateUser:any) :Promise<any>{
        return this.authService.updateUser(headers,updateUser)
    }
}
