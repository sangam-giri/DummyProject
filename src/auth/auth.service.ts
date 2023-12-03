import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}

    async signUp(signUpDto:SignUpDto):Promise<any>{
        const {name,email,password,role}=signUpDto;

   const userExists =await this.userModel.findOne({email});
   if(userExists){
    throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
   }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await this.userModel.create({
         name,email,role,password:hashedPassword,
    })
    const token=this.jwtService.sign({
        id:user._id
    })
    const id = user._id   
    return {id,name:user.name,email:user.email,role:user.role,profile:user.profile,token};
}

    async login(loginDto:LoginDto):Promise<any>{
      const {email,password}=loginDto;
const user = await this.userModel.findOne({email})

if(!user){
    throw new UnauthorizedException('Invalid email or password')
}

const isPasswordMatched=await bcrypt.compare(password,user.password)

if(!isPasswordMatched){ throw new UnauthorizedException('Invalid email or password')
}
const token=this.jwtService.sign({
    id:user._id
})
const id = user._id  
return {id,name:user.name,email:user.email,role:user.role,profile:user.profile,token};
}

async user(headers:any) :Promise<any>{
    const authorizationHeader = headers.authorization; 
    if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', ''); 
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token,secret); 
      let id =decoded["id"];
      let user= await this.userModel.findById(id);
      
return {id,name:user.name,email:user.email,role:user.role,profile:user.profile};
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    }else{
        throw new UnauthorizedException('Invalid or missing Bearer token');
    }
}

async updateUser(headers:any,updateUser:any):Promise<any>{
    const authorizationHeader = headers.authorization; 
    if (authorizationHeader) {
    const token = authorizationHeader.replace('Bearer ', ''); 
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token,secret);
    let id =decoded["id"];
    let user = await this.userModel.findByIdAndUpdate(id,{$set:{
        name:updateUser.name
    }},{
        new:true,
        runValidators:true
    });
    
    return {id,name:user.name,email:user.email,role:user.role,profile:user.profile};
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    }else{
        throw new UnauthorizedException('Invalid or missing Bearer token');
    }
}
async allUser():Promise<User[]>{
    const product = await this.userModel.find();
        return product;
}
}
