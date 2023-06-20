import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  generateToken(userAuthDto: UserAuthDto) {
    return this.jwtService.sign(userAuthDto);
  }
}
