import { Module } from '@nestjs/common';
import { UserModule } from './web/user.module';

@Module({
  imports: [UserModule],
  exports: [],
})
export class WebModule {}
