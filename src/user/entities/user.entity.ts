import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  status: string;

  @Prop({ required: true, type: String })
  refreshToken: string;

  @Prop({ required: true, type: String })
  refreshTokenCreatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
