import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { SchedulerModule } from 'src/scheduler/scheduler.module';
import { UsersModule } from 'src/users/users.module';
import config from './db.config';

export const allModules = [
  TypeOrmModule.forRoot(config),
  ConfigModule.forRoot(),
  ScheduleModule.forRoot(),
  UsersModule,
  CqrsModule,
  ProfilesModule,
  SchedulerModule,
];
