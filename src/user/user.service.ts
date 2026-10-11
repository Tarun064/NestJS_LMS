import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}
    async createUser(registerUserDto:RegisterDto){
        try{
            return await this.userModel.create({
            fname:registerUserDto.fname,
            lname:registerUserDto.lname,
            email:registerUserDto.email,
            password:registerUserDto.password
            });
        }
        catch(err:unknown){
            console.log(err);
            //typeof err === 'object' && err!=null && 'code' in err.... these are some extra checks that i have put before directly trying to grt th value from any object 
            // if(typeof err === 'object' && err!=null && 'code' in err && err.code === 11000){
            //     throw new ConflictException('Email already exists');
            // }  or we can do that another way
            const e = err as {code?:number};
            const DUPLICATE_ERROR_KEY_CODE=11000;
            if(e.code === DUPLICATE_ERROR_KEY_CODE){
                throw new ConflictException('Email already exists');
            }
            throw err;
        }
    }

    async getUserById(id: string){
        return await this.userModel.findOne({_id:id});
    }
}
