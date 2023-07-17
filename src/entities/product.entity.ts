import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
import { Category } from './category.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});
