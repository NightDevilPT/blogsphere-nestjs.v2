import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { allBlogCommandHandler } from './command';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from 'src/services/jwt-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from './entities/blog.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { allBlogsQuery } from './query';
import { PaginationService } from 'src/services/pagination-service';
import { Scheduler } from 'src/scheduler/entities/scheduler.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User, Blog, Profile, Scheduler]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    JwtService,
    PaginationService,
    ...allBlogCommandHandler,
    ...allBlogsQuery,
  ],
})
export class BlogsModule {}
