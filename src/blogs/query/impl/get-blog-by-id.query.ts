import { IQuery } from '@nestjs/cqrs';

export class GetBlogByIdQuery implements IQuery {
  constructor(public readonly blogId: string) {}
}
