import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from './comman.dto';

export class CreateCategoryDto {
  name: string;
  status: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CategoryPaginationDto extends PartialType(PaginationDto) {
  status?: string;
}
