import { Types } from 'mongoose';

export class AdminAuthDto {
  _id: Types.ObjectId;
  email: string;
  accountType: string;
}

export class UserAuthDto {
  _id: Types.ObjectId;
  email: string;
  accountType: string;
}
