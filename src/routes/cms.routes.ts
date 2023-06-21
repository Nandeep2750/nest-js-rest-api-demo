import { Routes } from '@nestjs/core';
import { AdminModule } from '../modules/admin.module';

export const CMS_ROUTES: Routes = [
  {
    path: 'cms',
    children: [AdminModule],
  },
];
