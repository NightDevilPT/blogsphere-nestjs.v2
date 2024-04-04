import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
// import config from './config/db.config';
import * as dotenv from 'dotenv';
import { AllEntities } from './config/allEntities';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './services/task-scheduler.service';
import { SchedulerModule } from './scheduler/scheduler.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blogs',
      entities: [...AllEntities],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    UsersModule,
    CqrsModule,
    ProfilesModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService, SchedulerService],
})
export class AppModule {}
