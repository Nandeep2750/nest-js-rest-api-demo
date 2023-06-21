import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { USER_CONFIG } from 'src/config/constants';

@Injectable()
export class WebJwtStrategy extends PassportStrategy(
  Strategy,
  'web-jwt-strategy',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: USER_CONFIG.JWT_KEY,
    });
  }

  validate(payload: Express.User) {
    return payload;
  }
}
