import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { USER_CONFIG } from 'src/config/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({
    required: true,
    default: USER_CONFIG.STATUS_TYPE.PENDING,
    type: String,
  })
  status: string;

  @Prop({ required: false, type: String })
  refreshToken: string;

  @Prop({ required: false, type: String })
  refreshTokenCreatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
