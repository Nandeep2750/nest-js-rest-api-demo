import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ADMIN_CONFIG } from 'src/config/constants';

const { PASSWORD } = ADMIN_CONFIG;

export class CreateAdminDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(PASSWORD.MIN, PASSWORD.MAX)
  @IsNotEmpty()
  password: string;
}

export class LoginAdminDto {
  email: string;
  password: string;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
