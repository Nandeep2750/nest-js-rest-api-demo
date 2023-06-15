import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { USER_CONFIG } from 'src/config/constants';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: USER_CONFIG.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
