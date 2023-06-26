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

import {
  CategoryPaginationDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/dtos/category.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import {
  createCategorySchema,
  listPaginateCategorySchema,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch('edit/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
