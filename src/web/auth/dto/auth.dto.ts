import { Types } from 'mongoose';

export class UserAuthDto {
  _id: Types.ObjectId;
  email: string;
  accountType: string;
}
