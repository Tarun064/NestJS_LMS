import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}
    async registerUser(registerUserDto:RegisterDto){
        console.log(registerUserDto);
        const saltRounds=10;
        const hash = await bcrypt.hash(registerUserDto.password,saltRounds);
        const user = await this.userService.createUser({...registerUserDto,password:hash});
        
        return user;
    }
    
}
