import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ADMIN_CONFIG } from 'src/config/constants';
import { CmsAuthService } from '../../service/cms-auth.service';
import { CmsJwtStrategy } from '../../strategies/cms-jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cms-jwt-strategy' }),
    JwtModule.register({
      // global: true,
      secret: ADMIN_CONFIG.JWT_KEY,
      signOptions: { expiresIn: ADMIN_CONFIG.TOKEN_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [CmsAuthService, CmsJwtStrategy],
  exports: [CmsAuthService, JwtModule],
})
export class CmsAuthModule {}
