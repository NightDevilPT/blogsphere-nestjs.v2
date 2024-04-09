import { ICommand } from '@nestjs/cqrs';
import { UpdateBlogDto } from 'src/blogs/dto/update-blog.dto';

export class UpdateBlogCommand implements ICommand {
  constructor(
    public readonly payload: UpdateBlogDto,
    public readonly blogId: string,
  ) {}
}
