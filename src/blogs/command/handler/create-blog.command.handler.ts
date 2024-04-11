import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { CreateBlogCommand } from '../impl/create-blog.command';
import { CreateSchedulerDto } from 'src/scheduler/dto/create-scheduler.dto';
import { CreateSchedularCommand } from 'src/scheduler/command/handler/create-schedular.command';

@Injectable()
@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CreateBlogCommand): Promise<any> {
    const { payload, userId } = command;

    // Find user with profile
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    // Check if user with profile exists
    if (!findUser || !findUser.profile) {
      throw new NotFoundException('User not found or profile does not exist');
    }

    // Create new blog with author's profile
    const createBlog = this.blogRepository.create({
      ...payload,
      author: findUser.profile,
      // schedular: new Date(new Date().getTime() + 60000),
    });

    // Save the new blog
    const savedBlog = await this.blogRepository.save(createBlog);

    if (savedBlog.schedular) {
      const schedularPayload: CreateSchedulerDto = {
        createdBy: savedBlog.author.id,
        payload: { publish: true },
        command: 'UpdateBlogCommand',
        timeStamp: savedBlog.schedular,
        payloadId: savedBlog.id,
      };

      const saveSchedular = await this.commandBus.execute(
        new CreateSchedularCommand(schedularPayload),
      );

      return {
        data: savedBlog,
        ...saveSchedular,
      };
    }

    // Return success message and saved blog data
    return {
      message: 'Blog successfully created',
      data: savedBlog,
    };
  }
}
