import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

import { User, UserDocument } from './entities/user.entity';
import { USER_CONFIG } from 'src/config/constants';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  @HttpCode(StatusCodes.CREATED)
  async register(createUserDto: CreateUserDto) {
    const user = await this.userModal.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new HttpException(
        'Email already exists please use another one.',
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = await hash(
      createUserDto.password,
      USER_CONFIG.SALT_ROUNDS,
    );
    const newUser = await new this.userModal(createUserDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: 'User registerd successfully',
      data: newUser,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
