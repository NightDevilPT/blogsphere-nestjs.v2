import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { CreateBlogCommand } from '../impl/create-blog.command';

@Injectable()
@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    });

    // Save the new blog
    const savedBlog = await this.blogRepository.save(createBlog);

    // Return success message and saved blog data
    return {
      message: 'Blog successfully created',
      data: savedBlog,
    };
  }
}
