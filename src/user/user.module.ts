import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  providers: [UserService],
  exports: [UserService] // yha meine iss module kichijo ko dusre modules ke liye bhiavailable kar diya hai
})
export class UserModule {}
