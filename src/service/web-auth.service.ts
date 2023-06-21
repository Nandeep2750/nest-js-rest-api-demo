import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from 'src/dtos/auth.dto';

@Injectable()
export class WebAuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(userAuthDto: UserAuthDto) {
    return this.jwtService.sign(userAuthDto);
  }
}
