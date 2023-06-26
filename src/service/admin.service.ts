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
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
} from '../dtos/admin.dto';
import { Admin, AdminDocument } from '../entities/admin.entity';
import { ACCOUNT_TYPE, ADMIN_CONFIG } from 'src/config/constants';
import { MESSAGE } from 'src/config/message';
import { CmsAuthService } from './cms-auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModal: Model<AdminDocument>,
    private cmsAuthService: CmsAuthService,
  ) {}

  async register(createAdminDto: CreateAdminDto) {
    const admin = await this.adminModal.findOne({
      email: createAdminDto.email,
    });

    if (admin) {
      throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
    }

    createAdminDto.password = await hash(
      createAdminDto.password,
      ADMIN_CONFIG.SALT_ROUNDS,
    );
    await new this.adminModal(createAdminDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: MESSAGE.SUCCESS.ADMIN_REGISTRATION_SUCCESS,
    };
  }

  async login(loginAdminDto: LoginAdminDto) {
    let admin = (await this.adminModal
      .findOne({
        email: loginAdminDto.email,
      })
      .select([
        'firstName',
        'lastName',
        'email',
        'password',
      ])) as AdminDocument & { token: string };

    if (!admin) {
      throw new ForbiddenException(MESSAGE.ERROR.INVALID_LOGIN_CREDENTIALS);
    }

    const isPasswordValid = await compare(
      loginAdminDto.password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException(MESSAGE.ERROR.INVALID_LOGIN_CREDENTIALS);
    }
    admin = admin.toObject();
    delete admin.password;

    admin.token = await this.cmsAuthService.generateToken({
      _id: admin._id,
      email: admin.email,
      accountType: ACCOUNT_TYPE.ADMIN,
    });

    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.ADMIN_LOGIN_SUCCESS,
      data: admin,
    };
  }

  findAll() {
    return 'This action returns all admin.';
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async updateAdminById(
    adminId: string | Types.ObjectId,
    updateAdminDto: UpdateAdminDto,
  ) {
    if (updateAdminDto.email) {
      const admin = await this.adminModal.findOne({
        email: updateAdminDto.email,
        _id: { $ne: adminId },
      });
      if (admin) {
        throw new ConflictException(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
      }
    }

    return this.adminModal
      .findByIdAndUpdate(
        new Types.ObjectId(adminId),
        {
          ...updateAdminDto,
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
          throw new NotFoundException(MESSAGE.ERROR.NO_ADMIN_FOR_ID);
        }
      });
  }

  async changePassword(
    adminId: string | Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ) {
    if (changePasswordDto.oldPassword === changePasswordDto.newPassword) {
      throw new ForbiddenException(MESSAGE.ERROR.PASSWORDS_SHOULD_NOT_MATCH);
    }
    return this.adminModal
      .findById(new Types.ObjectId(adminId))
      .select(['firstName', 'lastName', 'email', 'password'])
      .exec()
      .then(async (admin) => {
        if (admin) {
          const isPasswordValid = await compare(
            changePasswordDto.oldPassword,
            admin.password,
          );
          if (!isPasswordValid) {
            throw new ForbiddenException(MESSAGE.ERROR.OLD_PASSWORD_NOT_VALID);
          }
          admin.password = await hash(
            changePasswordDto.newPassword,
            ADMIN_CONFIG.SALT_ROUNDS,
          );
          await admin.save();
          return {
            statusCode: StatusCodes.OK,
            message: MESSAGE.SUCCESS.PASSWORD_CHANGED_SUCCESS,
          };
        } else {
          throw new NotFoundException(MESSAGE.ERROR.NO_ADMIN_FOR_ID);
        }
      });
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
