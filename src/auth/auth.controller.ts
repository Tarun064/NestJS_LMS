import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import { AuthGuard } from './auth.guard.js';
import { UserService } from '../user/user.service.js';

@Controller('auth')
export class AuthController {
    // authService: AuthService;
    // constructor(authService:AuthService){
    //     this.authService=authService;
    // }
    //iss upr wale purre kaam ka shorter version hota hai
    constructor(private readonly authService:AuthService, 
        private readonly userService:UserService){}

    @Post('register')
    async register(@Body() registerUserDto:RegisterDto){
        const token=await this.authService.registerUser(registerUserDto);
        return token;
    }

    //incomplete need to complete this functionality
    /*
        1. recieve the email and password from user
        2. match the email and password
        3. Generate the JWT token
     */
    @Post('login')
    async login(){

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Request() req:any){
        const userId = req.user.sub; // Access the user ID from the request object 
        
        const user = await this.userService.getUserById(userId);
        // return user;  agr kuch data remove krna hai like password vgrh, toh sirf neccessary data hi bhejunga
        return {
            id: user?._id,
            fname: user?.fname,
            lname:user?.lname,
            email:user?.email,
        };
    }
}
