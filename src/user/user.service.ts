import {
  HttpCode,
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';
import { USER_CONFIG } from 'src/config/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  @HttpCode(StatusCodes.CREATED)
  async register(createUserDto: CreateUserDto) {
    const user = await this.userModal.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException(
        'Email already exists please use another one.',
      );
    }

    createUserDto.password = await hash(
      createUserDto.password,
      USER_CONFIG.SALT_ROUNDS,
    );
    const newUser = await new this.userModal(createUserDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: 'User registerd successfully.',
      data: newUser,
    };
  }

  @HttpCode(StatusCodes.OK)
  async login(loginUserDto: LoginUserDto) {
    let user = await this.userModal
      .findOne({
        email: loginUserDto.email,
      })
      .select(['firstName', 'lastName', 'email', 'password', 'gender']);

    user = user.toObject();

    if (!user) {
      throw new UnauthorizedException('Please check Credentials.');
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Please check Credentials.');
    }
    delete user.password;
    return {
      statusCode: StatusCodes.OK,
      message: 'User loggedin successfully.',
      data: user,
    };
  }

  findAll() {
    return 'This action returns all user.';
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
