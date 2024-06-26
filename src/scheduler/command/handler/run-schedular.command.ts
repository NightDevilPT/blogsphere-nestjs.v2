import { CommandBus, ICommand } from '@nestjs/cqrs';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Scheduler } from 'src/scheduler/entities/scheduler.entity';
import { UpdateBlogCommand } from 'src/blogs/command/impl/update-blog.command';

export class RunSchedularCommand implements ICommand {
  constructor() {}
}

@Injectable()
@CommandHandler(RunSchedularCommand)
export class RunSchedularHandler
  implements ICommandHandler<RunSchedularCommand>
{
  constructor(
    @InjectRepository(Scheduler)
    private readonly schedularRepository: Repository<Scheduler>,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(): Promise<any> {
    const findSch = await this.schedularRepository.find({
      where: {
        timeStamp: LessThanOrEqual(new Date()),
        status: 'Pending',
      },
      take: 50,
    });

    for (let i = 0; i < findSch.length; i++) {
      const updateBlog = await this.commandBus.execute(
        new UpdateBlogCommand(findSch[i].payload, findSch[i].payloadId),
      );

      if (updateBlog) {
        findSch[i].status = 'Success';
        await this.schedularRepository.save(findSch[i]);
      }
      console.log(findSch[i].payloadId, ' executed...');
    }
  }
}
