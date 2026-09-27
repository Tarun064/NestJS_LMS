import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule,
    UserModule,
    ConfigModule.forRoot(), //env file read krne ka method, config module provided by netsjs
    MongooseModule.forRoot(process.env.MONGODB_URL as string)], //mongoose package
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
