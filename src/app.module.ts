import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './web/modules/user.module';
import { RoutingModule } from './routing.module';

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
    RoutingModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
