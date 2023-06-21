import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WEB_ROUTES } from '../routes/web.routes';
import { CMS_ROUTES } from '../routes/cms.routes';

const ROUTES = [...WEB_ROUTES, ...CMS_ROUTES];

@Module({
  imports: [RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {}
