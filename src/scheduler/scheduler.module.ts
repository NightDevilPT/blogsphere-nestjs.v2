import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { allSchedularCommand } from './command';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Scheduler } from './entities/scheduler.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Blog, Scheduler])],
  controllers: [SchedulerController],
  providers: [SchedulerService, ...allSchedularCommand],
})
export class SchedulerModule {}
