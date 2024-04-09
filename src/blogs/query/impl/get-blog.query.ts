import { IQuery } from '@nestjs/cqrs';

export class GetBlogQuery implements IQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}
