import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WEB_ROUTES } from './web/web.routes';

const ROUTES = [...WEB_ROUTES];

@Module({
  imports: [RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class RoutingModule {}
