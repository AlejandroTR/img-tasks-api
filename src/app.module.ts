import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoConfig } from './infrastructure/config/mongo.config';
import { TaskModule } from './infrastructure/modules/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    MongooseModule.forRoot(mongoConfig.uri!),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
