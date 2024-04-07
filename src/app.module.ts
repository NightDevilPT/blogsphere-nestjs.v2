import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { SchedulerService } from './services/task-scheduler.service';
import { allModules } from './config/allModules';

dotenv.config();

@Module({
  imports: [...allModules],
  controllers: [AppController],
  providers: [AppService, SchedulerService],
})
export class AppModule {}
