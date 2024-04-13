import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/blogs/entities/blog.entity';
import { GetBlogByIdQuery } from '../impl/get-blog-by-id.query';

@Injectable()
@QueryHandler(GetBlogByIdQuery)
export class GetBlogByIdHandler implements IQueryHandler<GetBlogByIdQuery> {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async execute({ blogId }: GetBlogByIdQuery): Promise<any> {
    const blogData = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['likes', 'author'],
    });
    return {
      message: 'Data successfully fetched',
      data: blogData,
    };
  }
}
