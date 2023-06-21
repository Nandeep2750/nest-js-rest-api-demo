import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthDto } from '../dtos/auth.dto';

@Injectable()
export class CmsAuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(adminAuthDto: AdminAuthDto) {
    return this.jwtService.sign(adminAuthDto);
  }
}
