import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CmsAuthModule } from './cms-auth.module';
import { CmsAuthService } from '../../service/cms-auth.service';
import { ProductService } from 'src/service/product.service';
import { ProductController } from 'src/controllers/cms/product.controller';
import { Product, ProductSchema } from 'src/entities/product.entity';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CmsAuthModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [CmsAuthService, ProductService],
})
export class ProductModule {
  // constructor() {
  //   mongoose.plugin(mongoosePaginate);
  // }
}
