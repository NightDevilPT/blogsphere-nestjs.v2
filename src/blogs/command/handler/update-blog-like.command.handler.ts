import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { ICommand } from '@nestjs/cqrs';
import { User } from 'src/users/entities/user.entity';

export class UpdateBlogLikesCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly blogId: string,
  ) {}
}

@Injectable()
@CommandHandler(UpdateBlogLikesCommand)
export class UpdateBlogLikesHandler
  implements ICommandHandler<UpdateBlogLikesCommand>
{
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateBlogLikesCommand): Promise<any> {
    const { userId, blogId } = command;

    // Fetch the blog with its associated likes
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['likes'],
    });

    // Fetch the user and their associated profile
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    // Ensure that blog likes are initialized as an empty array if not present
    if (!blog.likes) {
      blog.likes = [];
    }

    // Check if the user has already liked the blog
    const userLikedIndex = blog.likes.findIndex(
      (like) => like.id === user.profile.id,
    );

    let message = '';

    if (userLikedIndex === -1) {
      // If the user has not liked the blog, add their profile to the likes array
      blog.likes.push(user.profile);
      message = 'You liked this blog';
    } else {
      // If the user has already liked the blog, remove their profile from the likes array
      blog.likes = blog.likes.filter((like) => like.id !== user.profile.id);
      message = 'You removed your like';
    }

    // Save the updated blog entity
    const updatedBlog = await this.blogRepository.save(blog);

    return {
      message,
      data: updatedBlog,
    };
  }
}
