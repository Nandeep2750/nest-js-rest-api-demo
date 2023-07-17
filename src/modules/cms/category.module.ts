import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CmsAuthModule } from './cms-auth.module';
import { CmsAuthService } from '../../service/cms-auth.service';
import { CategoryService } from 'src/service/category.service';
import { CategoryController } from 'src/controllers/cms/category.controller';
import { Category, CategorySchema } from 'src/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    CmsAuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CmsAuthService],
  exports: [CategoryService],
})
export class CategoryModule {
  // constructor() {
  //   mongoose.plugin(mongoosePaginate);
  // }
}
