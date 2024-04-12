import { ICommand } from '@nestjs/cqrs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheduler } from 'src/scheduler/entities/scheduler.entity';

export class UpdateSchedulerCommand implements ICommand {
  constructor(
    public readonly timeStamp: Date,
    public readonly id: string,
  ) {}
}

@Injectable()
@CommandHandler(UpdateSchedulerCommand)
export class UpdateSchedulerHandler implements ICommandHandler<UpdateSchedulerCommand> {
  constructor(
    @InjectRepository(Scheduler)
    private readonly schedulerRepository: Repository<Scheduler>,
  ) {}

  async execute(command: UpdateSchedulerCommand): Promise<any> {
    const { timeStamp, id } = command;
    const updateResult = await this.schedulerRepository.update(
      { payloadId: id },
      { timeStamp, status: 'Pending' },
    );
    return {
      message: `Scheduler updated`,
      updatedCount: updateResult.affected ?? 0,
    };
  }
}
