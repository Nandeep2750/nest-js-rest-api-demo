import { Module } from '@nestjs/common';
import { AdminModule } from './cms/admin.module';
import { CategoryModule } from './cms/category.module';
import { ProductModule } from './cms/product.module';

@Module({
  imports: [AdminModule, CategoryModule, ProductModule],
  exports: [],
})
export class CmsModule {}
