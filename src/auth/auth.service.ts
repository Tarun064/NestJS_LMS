import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService, private readonly jwtService:JwtService){}
    async registerUser(registerUserDto:RegisterDto){
        console.log(registerUserDto);
        const saltRounds=10;
        const hash = await bcrypt.hash(registerUserDto.password,saltRounds);
        const user = await this.userService.createUser({...registerUserDto,password:hash});

        const payload = {sub: user._id}; // payload jo hmm store krvaaenge token mein
        const token = await this.jwtService.signAsync(payload);
        
        return {access_token:token}; // token ko return krdo json form mein
    }
    
}
