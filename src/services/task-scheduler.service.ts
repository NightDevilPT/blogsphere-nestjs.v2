import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RunSchedularCommand } from 'src/scheduler/command/handler/run-schedular.command';

@Injectable()
export class SchedulerService {
  constructor(private readonly commandBus:CommandBus){}
  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('cron running...', new Date().toLocaleString());
    this.commandBus.execute(new RunSchedularCommand())
  }
}
