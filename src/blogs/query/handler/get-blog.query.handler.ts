import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/services/pagination-service';
import { Blog } from 'src/blogs/entities/blog.entity';
import { GetBlogQuery } from '../impl/get-blog.query';

@Injectable()
@QueryHandler(GetBlogQuery)
export class GetBlogHandler implements IQueryHandler<GetBlogQuery> {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private pagination: PaginationService,
  ) {}

  async execute({ page, limit }: GetBlogQuery): Promise<any> {
    const blogData = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .select([
        'blog.id',
        'blog.title',
        'blog.description',
        'blog.data',
        'blog.image',
        'blog.tags',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.avatar',
        'author.facebookUrl',
        'author.instagramUrl',
        'author.linkedinUrl',
        'author.youtubeUrl',
      ])
      .getMany();
    return {
      message: 'Data successfully fetched',
      data: this.pagination.paginateArray(blogData, page, limit),
    };
  }
}
