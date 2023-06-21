import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { RoutingModule } from './modules/routing.module';
import { WebModule } from './modules/web.module';
import { CmsModule } from './modules/cms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    WebModule,
    CmsModule,
    RoutingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
