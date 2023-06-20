import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(userAuthDto: UserAuthDto) {
    return this.jwtService.sign(userAuthDto);
  }
}
