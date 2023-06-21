import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  name: string;
  status: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
