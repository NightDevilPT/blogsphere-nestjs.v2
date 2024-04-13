import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { UpdateBlogCommand } from '../impl/update-blog.command';
import { UpdateSchedulerCommand } from 'src/scheduler/command/handler/update-schedular.command';

@Injectable()
@CommandHandler(UpdateBlogCommand)
export class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private commandBus: CommandBus,
  ) {}

  async execute(command: UpdateBlogCommand): Promise<any> {
    const { payload, blogId } = command;

    // Find the blog by its ID
    const findBlog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    if (!findBlog) {
      throw new NotFoundException('Blog not found');
    }
    if (payload.schedular) {
      const scheduleUpdate = await this.commandBus.execute(
        new UpdateSchedulerCommand(payload.schedular, findBlog.id),
      );
    }
    Object.assign(findBlog, payload);
    await this.blogRepository.save(findBlog);
    return {
      message: 'Blog successfully updated',
      data: findBlog,
    };
  }
}
