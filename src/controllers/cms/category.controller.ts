import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

import {
  CategoryPaginationDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/dtos/category.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import {
  createCategorySchema,
  listPaginateCategorySchema,
  updateCategorySchema,
} from 'src/schema/category.schema';
import { CategoryService } from 'src/service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  @HttpCode(StatusCodes.CREATED)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('list')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  findAll() {
    return this.categoryService.findAll();
  }

  @Post('paginate-list')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(listPaginateCategorySchema))
  findAllPaginate(@Body() categoryPaginationDto: CategoryPaginationDto) {
    return this.categoryService.findAllPaginate(categoryPaginationDto);
  }

  @Get('details-by-id/:categoryId')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  findOne(@Param('categoryId') categoryId: Types.ObjectId) {
    return this.categoryService.findOne(categoryId);
  }

  @Patch('edit/:categoryId')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  update(
    @Param('categoryId') categoryId: string,
    @Body(new JoiValidationPipe(updateCategorySchema))
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, updateCategoryDto);
  }

  // @Delete('delete/:categoryId')
  // remove(@Param('categoryId') categoryId: string) {
  //   return this.categoryService.remove(categoryId);
  // }
}
