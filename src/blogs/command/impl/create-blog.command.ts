import { ICommand } from '@nestjs/cqrs';
import { CreateBlogDto } from 'src/blogs/dto/create-blog.dto';

export class CreateBlogCommand implements ICommand {
  constructor(
    public readonly payload: CreateBlogDto,
    public readonly userId: string,
  ) {}
}
