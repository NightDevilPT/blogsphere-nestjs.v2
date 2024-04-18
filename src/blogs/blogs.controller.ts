import {
  Body,
  Controller,
  Get,
  Param,
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
  ApiParam,
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
import { UpdateBlogLikesCommand } from './command/handler/update-blog-like.command.handler';
import { GetBlogByIdQuery } from './query/impl/get-blog-by-id.query';

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

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a blog by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the requested blog',
    type: Blog,
  })
  @ApiParam({ name: 'id', description: 'ID of the blog' })
  async getBlogById(@Param('id') id: string): Promise<Blog> {
    return this.queryBus.execute(new GetBlogByIdQuery(id));
  }

  @Put('/likes/:id')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modify the likes of a blog' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The blog like has been successfully updated.',
  })
  @ApiParam({ name: 'id', description: 'ID of the blog' })
  async updateBlogLike(@Param('id') id: string, @Req() req) {
    const { userId } = req.user;
    return this.commandBus.execute(new UpdateBlogLikesCommand(userId, id));
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
