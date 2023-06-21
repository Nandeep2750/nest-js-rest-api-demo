import { Routes } from '@nestjs/core';
import { UserModule } from '../modules/web/user.module';

export const WEB_ROUTES: Routes = [
  {
    path: 'web',
    children: [UserModule],
  },
];
