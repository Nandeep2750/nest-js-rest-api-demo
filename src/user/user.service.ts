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
} from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';
import { ACCOUNT_TYPE, USER_CONFIG } from 'src/config/constants';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModal: Model<UserDocument>,
    private authService: AuthService,
  ) {}

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

  async login(loginUserDto: LoginUserDto) {
    let user = (await this.userModal
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
      throw new ForbiddenException('Please check Credentials.');
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Please check Credentials.');
    }
    user = user.toObject();
    delete user.password;

    user.token = await this.authService.generateToken({
      _id: user._id,
      email: user.email,
      accountType: ACCOUNT_TYPE.USER,
    });

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

  async updateUserById(
    userId: string | Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.email) {
      const user = await this.userModal.findOne({
        email: updateUserDto.email,
        _id: { $ne: userId },
      });
      if (user) {
        throw new ConflictException(
          'Email already used by other user please use another one.',
        );
      }
    }

    return this.userModal
      .findByIdAndUpdate(
        new Types.ObjectId(userId),
        {
          ...updateUserDto,
        },
        { new: true },
      )
      .select(['firstName', 'lastName', 'email', 'type', 'refreshToken'])
      .exec()
      .then((result) => {
        if (result) {
          return {
            statusCode: StatusCodes.OK,
            message: 'Profile updated successfully.',
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
      throw new ForbiddenException(
        'The old password and the new password should not be the same.',
      );
    }
    return this.userModal
      .findById(new Types.ObjectId(userId))
      .select([
        'firstName',
        'lastName',
        'email',
        'password',
        'type',
        'refreshToken',
      ])
      .exec()
      .then(async (user) => {
        if (user) {
          const isPasswordValid = await compare(
            changePasswordDto.oldPassword,
            user.password,
          );
          if (!isPasswordValid) {
            throw new ForbiddenException('Old password is not valid.');
          }
          user.password = await hash(
            changePasswordDto.newPassword,
            USER_CONFIG.SALT_ROUNDS,
          );
          await user.save();
          return {
            statusCode: StatusCodes.OK,
            message: 'Password changed successfully.',
          };
        } else {
          throw new NotFoundException('No user available for given user Id.');
        }
      });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
