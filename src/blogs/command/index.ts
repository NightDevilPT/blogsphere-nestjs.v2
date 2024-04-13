import { CreateBlogHandler } from './handler/create-blog.command.handler';
import { UpdateBlogLikesHandler } from './handler/update-blog-like.command.handler';
import { UpdateBlogHandler } from './handler/update-blog.command.handler';

export const allBlogCommandHandler = [
  CreateBlogHandler,
  UpdateBlogHandler,
  UpdateBlogLikesHandler,
];
