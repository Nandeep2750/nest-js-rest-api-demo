import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsIn, IsNotEmpty, Length } from 'class-validator';
import { USER_CONFIG } from 'src/config/constants';

const { PASSWORD, GENDER } = USER_CONFIG;

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsIn(Object.values(GENDER))
  @IsNotEmpty()
  gender: string;

  @Length(PASSWORD.MIN, PASSWORD.MAX)
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
