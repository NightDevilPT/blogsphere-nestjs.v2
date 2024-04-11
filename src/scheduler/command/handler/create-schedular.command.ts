import { ICommand } from '@nestjs/cqrs';
import { CreateSchedulerDto } from 'src/scheduler/dto/create-scheduler.dto';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheduler } from 'src/scheduler/entities/scheduler.entity';

export class CreateSchedularCommand implements ICommand {
  constructor(public readonly payload: CreateSchedulerDto) {}
}

@Injectable()
@CommandHandler(CreateSchedularCommand)
export class CreateSchedularHandler
  implements ICommandHandler<CreateSchedularCommand>
{
  constructor(
    @InjectRepository(Scheduler)
    private readonly schedularRepository: Repository<Scheduler>,
  ) {}

  async execute(command: CreateSchedularCommand): Promise<any> {
    const { payload } = command;
    const createSchedular = await this.schedularRepository.create(payload);
    const saveSch = await this.schedularRepository.save(createSchedular);

	return {
		message:`Blog successfully created and publish in ${payload.timeStamp}`,
		
	}
  }
}
