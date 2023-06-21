import { Module } from '@nestjs/common';
import { AdminModule } from './cms/admin.module';
import { CategoryModule } from './cms/category.module';

@Module({
  imports: [AdminModule, CategoryModule],
  exports: [],
})
export class CmsModule {}
