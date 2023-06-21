import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { USER_CONFIG } from 'src/config/constants';
import { WebAuthService } from 'src/service/web-auth.service';
import { WebJwtStrategy } from 'src/strategies/web-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'web-jwt-strategy' }),
    JwtModule.register({
      // global: true,
      secret: USER_CONFIG.JWT_KEY,
      signOptions: { expiresIn: USER_CONFIG.TOKEN_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [WebAuthService, WebJwtStrategy],
  exports: [WebAuthService, JwtModule],
})
export class WebAuthModule {}
