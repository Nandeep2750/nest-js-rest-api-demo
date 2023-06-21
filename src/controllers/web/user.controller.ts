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
import { UserService } from '../../service/user.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '../../dtos/user.dto';
import {
  changePasswordSchema,
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from '../../schema/user.schema';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { StatusCodes } from 'http-status-codes';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(StatusCodes.CREATED)
  @UsePipes(new JoiValidationPipe(createUserSchema))
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  @UsePipes(new JoiValidationPipe(loginUserSchema))
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  // @Get()
  // findAll() {
  //   return `This action returns all user`;
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch('update')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('web-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  update(
    @Request() req: Express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user._id;
    return this.userService.updateUserById(userId, updateUserDto);
  }

  @Patch('change-password')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('web-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(changePasswordSchema))
  changePassword(
    @Request() req: Express.Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user._id;
    return this.userService.changePassword(userId, changePasswordDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
