import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { UpdateBlogCommand } from '../impl/update-blog.command';

@Injectable()
@CommandHandler(UpdateBlogCommand)
export class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async execute(command: UpdateBlogCommand): Promise<any> {
    const { payload, blogId } = command;

    // Find the blog by its ID
    const findBlog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    // Throw NotFoundException if blog not found
    if (!findBlog) {
      throw new NotFoundException('Blog not found');
    }

    // Update the blog with the new payload data
    Object.assign(findBlog, payload);

    // Save the updated blog
    await this.blogRepository.save(findBlog);

    // Return success message and updated blog data
    return {
      message: 'Blog successfully updated',
      data: findBlog,
    };
  }
}
