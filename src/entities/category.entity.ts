import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(mongoosePaginate);
