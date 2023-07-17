import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from './comman.dto';
import { Types } from 'mongoose';

export class CreateProductDto {
  name: string;
  categoryId: Types.ObjectId;
  description: string;
  imageUrl: string;
  price: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductPaginationDto extends PartialType(PaginationDto) {}
