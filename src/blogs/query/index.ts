import { GetBlogByIdHandler } from './handler/get-blog-by-id.query.handler';
import { GetBlogHandler } from './handler/get-blog.query.handler';

export const allBlogsQuery = [GetBlogHandler, GetBlogByIdHandler];
