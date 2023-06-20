import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { USER_CONFIG } from 'src/config/constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'web-jwt-strategy' }),
    JwtModule.register({
      global: true,
      secret: USER_CONFIG.JWT_KEY,
      signOptions: { expiresIn: USER_CONFIG.TOKEN_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
