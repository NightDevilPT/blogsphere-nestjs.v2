import { CreateBlogHandler } from './handler/create-blog.command.handler';
import { UpdateBlogHandler } from './handler/update-blog.command.handler';

export const allBlogCommandHandler = [CreateBlogHandler, UpdateBlogHandler];
