import { Routes } from '@nestjs/core';
import { AdminModule } from '../modules/cms/admin.module';
import { CategoryModule } from 'src/modules/cms/category.module';

export const CMS_ROUTES: Routes = [
  {
    path: 'cms',
    children: [AdminModule, CategoryModule],
  },
];
