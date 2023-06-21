import {
  Controller,
  Request,
  Post,
  Body,
  Patch,
  UsePipes,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '../../service/admin.service';
import {
  ChangePasswordDto,
  CreateAdminDto,
  LoginAdminDto,
  UpdateAdminDto,
} from '../../dtos/admin.dto';
import {
  changePasswordSchema,
  createAdminSchema,
  loginAdminSchema,
  updateAdminSchema,
} from '../../schema/admin.schema';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { StatusCodes } from 'http-status-codes';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @HttpCode(StatusCodes.CREATED)
  @UsePipes(new JoiValidationPipe(createAdminSchema))
  register(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.register(createAdminDto);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  @UsePipes(new JoiValidationPipe(loginAdminSchema))
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @Patch('update')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(updateAdminSchema))
  update(
    @Request() req: Express.Request,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const adminId = req.user._id;
    return this.adminService.updateAdminById(adminId, updateAdminDto);
  }

  @Patch('change-password')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(changePasswordSchema))
  changePassword(
    @Request() req: Express.Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const adminId = req.user._id;
    return this.adminService.changePassword(adminId, changePasswordDto);
  }
}
