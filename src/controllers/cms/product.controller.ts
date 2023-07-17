import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

import {
  ProductPaginationDto,
  CreateProductDto,
  UpdateProductDto,
} from 'src/dtos/product.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import {
  createProductSchema,
  listPaginateProductSchema,
  updateProductSchema,
} from 'src/schema/product.schema';
import { ProductService } from 'src/service/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  @HttpCode(StatusCodes.CREATED)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(createProductSchema))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('paginate-list')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  @UsePipes(new JoiValidationPipe(listPaginateProductSchema))
  findAllPaginate(@Body() productPaginationDto: ProductPaginationDto) {
    return this.productService.findAllPaginate(productPaginationDto);
  }

  @Get('details-by-id/:productId')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  findOne(@Param('productId') productId: Types.ObjectId) {
    return this.productService.findOne(productId);
  }

  @Patch('edit/:productId')
  @HttpCode(StatusCodes.OK)
  @UseGuards(AuthGuard('cms-jwt-strategy'))
  update(
    @Param('productId') productId: string,
    @Body(new JoiValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productId, updateProductDto);
  }

  // @Delete('delete/:productId')
  // remove(@Param('productId') productId: string) {
  //   return this.productService.remove(productId);
  // }
}
