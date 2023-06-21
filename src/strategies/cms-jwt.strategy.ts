import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ADMIN_CONFIG } from 'src/config/constants';

@Injectable()
export class CmsJwtStrategy extends PassportStrategy(
  Strategy,
  'cms-jwt-strategy',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ADMIN_CONFIG.JWT_KEY,
    });
  }

  validate(payload: Express.User) {
    return payload;
  }
}
