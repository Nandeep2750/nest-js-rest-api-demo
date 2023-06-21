import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from '../service/admin.service';
import { AdminController } from '../controllers/cms/admin.controller';
import { Admin, AdminSchema } from '../entities/admin.entity';
import { CmsAuthModule } from './cms-auth.module';
import { CmsAuthService } from '../service/cms-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    CmsAuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, CmsAuthService],
})
export class AdminModule {}
