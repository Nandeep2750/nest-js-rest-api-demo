import {
  ConflictException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '../dtos/user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { ACCOUNT_TYPE, USER_CONFIG } from 'src/config/constants';
import { MESSAGE } from 'src/config/message';
import { WebAuthService } from './web-auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private webAuthService: WebAuthService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    createUserDto.password = await hash(
      createUserDto.password,
      USER_CONFIG.SALT_ROUNDS,
    );
    const newUser = await new this.userModel(createUserDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: MESSAGE.SUCCESS.USER_REGISTRATION_SUCCESS,
      data: newUser,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    let user = (await this.userModel
      .findOne({
        email: loginUserDto.email,
      })
      .select([
        'firstName',
        'lastName',
        'email',
        'password',
        'gender',
      ])) as UserDocument & { token: string };

    if (!user) {
      throw new ForbiddenException(MESSAGE.ERROR.INVALID_LOGIN_CREDENTIALS);
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException(MESSAGE.ERROR.INVALID_LOGIN_CREDENTIALS);
    }
    user = user.toObject();
    delete user.password;

    user.token = await this.webAuthService.generateToken({
      _id: user._id,
      email: user.email,
      accountType: ACCOUNT_TYPE.USER,
    });

    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.USER_LOGIN_SUCCESS,
      data: user,
    };
  }

  findAll() {
    return 'This action returns all user.';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateUserById(
    userId: string | Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.email) {
      const user = await this.userModel.findOne({
        email: updateUserDto.email,
        _id: { $ne: userId },
      });
      if (user) {
        throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
      }
    }

    return this.userModel
      .findByIdAndUpdate(
        new Types.ObjectId(userId),
        {
          ...updateUserDto,
        },
        { new: true },
      )
      .select(['firstName', 'lastName', 'email'])
      .exec()
      .then((result) => {
        if (result) {
          return {
            statusCode: StatusCodes.OK,
            message: MESSAGE.SUCCESS.PROFILE_UPDATED_SUCCESS,
            data: result,
          };
        } else {
          throw new NotFoundException('No user available for given user Id.');
        }
      });
  }

  async changePassword(
    userId: string | Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ) {
    if (changePasswordDto.oldPassword === changePasswordDto.newPassword) {
      throw new ForbiddenException(MESSAGE.ERROR.PASSWORDS_SHOULD_NOT_MATCH);
    }
    return this.userModel
      .findById(new Types.ObjectId(userId))
      .select(['firstName', 'lastName', 'email', 'password'])
      .exec()
      .then(async (user) => {
        if (user) {
          const isPasswordValid = await compare(
            changePasswordDto.oldPassword,
            user.password,
          );
          if (!isPasswordValid) {
            throw new ForbiddenException(MESSAGE.ERROR.OLD_PASSWORD_NOT_VALID);
          }
          user.password = await hash(
            changePasswordDto.newPassword,
            USER_CONFIG.SALT_ROUNDS,
          );
          await user.save();
          return {
            statusCode: StatusCodes.OK,
            message: MESSAGE.SUCCESS.PASSWORD_CHANGED_SUCCESS,
          };
        } else {
          throw new NotFoundException(MESSAGE.ERROR.NO_USER_FOR_ID);
        }
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
