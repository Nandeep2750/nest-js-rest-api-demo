import { Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';

export const WEB_ROUTES: Routes = [
  {
    path: 'web',
    children: [UserModule],
  },
];
