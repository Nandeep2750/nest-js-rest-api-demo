import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: String })
  refreshToken: string;

  @Prop({ required: false, type: String })
  refreshTokenCreatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.plugin(mongoosePaginate);
AdminSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});
