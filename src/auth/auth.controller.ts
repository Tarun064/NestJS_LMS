import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';

@Controller('auth')
export class AuthController {
    // authService: AuthService;
    // constructor(authService:AuthService){
    //     this.authService=authService;
    // }
    //iss upr wale purre kaam ka shorter version hota hai
    constructor(private readonly authService:AuthService){}

    @Post('register')
    async register(@Body() registerUserDto:RegisterDto){
        const token=await this.authService.registerUser(registerUserDto);
        return token;
    }
}
