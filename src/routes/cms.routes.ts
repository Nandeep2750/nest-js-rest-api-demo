import { Routes } from '@nestjs/core';
import { AdminModule } from '../modules/cms/admin.module';

export const CMS_ROUTES: Routes = [
  {
    path: 'cms',
    children: [AdminModule],
  },
];
