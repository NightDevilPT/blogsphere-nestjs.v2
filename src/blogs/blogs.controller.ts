import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateBlogCommand } from './command/impl/create-blog.command';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateBlogCommand } from './command/impl/update-blog.command';
import { Blog } from './entities/blog.entity';
import { GetBlogQuery } from './query/impl/get-blog.query';

@Controller('blogs')
@ApiTags('Blogs')
export class BlogsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'Returns all blogs', type: [Blog] })
  async getAllBlogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Blog[]> {
    return this.queryBus.execute(new GetBlogQuery(page, limit));
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new blog' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully created.',
  })
  @ApiBody({ type: CreateBlogDto })
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const { userId } = req.user;
    return this.commandBus.execute(
      new CreateBlogCommand(createBlogDto, userId),
    );
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a blog' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The blog has been successfully updated.',
  })
  @ApiBody({ type: UpdateBlogDto })
  async updateBlog(
    @Body() updateBlogDto: UpdateBlogDto,
    @Query('blogId', ParseUUIDPipe) blogId: string,
  ) {
    return this.commandBus.execute(
      new UpdateBlogCommand(updateBlogDto, blogId),
    );
  }
}
