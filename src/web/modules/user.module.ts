import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from '../service/user.service';
import { UserController } from '../controllers/user.controller';
import { User, UserSchema } from '../entities/user.entity';
import { AuthModule } from './auth.module';
import { AuthService } from '../service/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
