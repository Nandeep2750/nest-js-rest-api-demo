import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from '../../service/user.service';
import { UserController } from '../../controllers/web/user.controller';
import { User, UserSchema } from '../../entities/user.entity';
import { WebAuthModule } from './web-auth.module';
import { WebAuthService } from 'src/service/web-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    WebAuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, WebAuthService],
})
export class UserModule {}
