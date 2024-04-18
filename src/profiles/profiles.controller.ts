import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  BadRequestException,
  Get,
  Query,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger'; // Import Swagger decorators
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './command/impl/create-profile.command';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateProfileCommand } from './command/impl/update-profile.command';
import { isUUID } from 'class-validator';
import { GetProfileQuery } from './query/impl/get-profile.query';
import { Profile } from './entities/profile.entity';
import { GetProfileByIdQuery } from './query/impl/get-profile-by-id.query';
import { UpdateProfileFollowCommand } from './command/impl/update-profile-follow.command';
import { GetProfileFollowingQuery } from './query/impl/get-profile-following.query';
import { GetProfileFollowersQuery } from './query/impl/get-profile-followers.query';

@ApiTags('Profiles') // Add ApiTags decorator to group endpoints in Swagger
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get-all-profile')
  @ApiOperation({ summary: 'Retrieve all profile data' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.queryBus.execute(new GetProfileQuery(page, limit));
  }

  @Get('get-profile-by-id/:id')
  @ApiOperation({ summary: 'Retrieve a profile by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the blog' })
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return this.queryBus.execute(new GetProfileByIdQuery(id));
  }

  @Get('get-profile')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a profile By Token' })
  async getProfile(@Req() req): Promise<Profile> {
    const { userId } = req.user;
    return this.queryBus.execute(new GetProfileByIdQuery(userId, true));
  }

  @Get('/followers')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a profile followers' })
  async getFollowers(@Req() req) {
    const { userId } = req.user;
    console.log(userId, '@@@@@@@');
    return this.queryBus.execute(new GetProfileFollowersQuery(userId));
  }

  @Get('/following')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve a profile following' })
  async getFollowing(@Req() req) {
    const { userId } = req.user;
    return this.queryBus.execute(new GetProfileFollowingQuery(userId));
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new profile' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
  })
  create(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const { userId } = req.user;
    return this.commandBus.execute(
      new CreateProfileCommand(createProfileDto, userId),
    );
  }

  @Put('/:profileId')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully Updated.',
  })
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('profileId') profileId: string,
  ) {
    if (!isUUID(profileId)) {
      throw new BadRequestException('Invalid profileId. It must be a UUID.');
    }
    return this.commandBus.execute(
      new UpdateProfileCommand(updateProfileDto, profileId),
    );
  }

  @Put('follow/:profileId')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add / Update profile follows' }) // Add summary for Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully Updated.',
  })
  updateProfileFollow(@Param('profileId') profileId: string, @Req() req) {
    const { userId } = req.user;
    if (!isUUID(profileId)) {
      throw new BadRequestException('Invalid profileId. It must be a UUID.');
    }
    return this.commandBus.execute(
      new UpdateProfileFollowCommand(profileId, userId),
    );
  }
}
