import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger'; // Import Swagger decorators
import { CommandBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './command/impl/create-profile.command';

@ApiTags('Profiles') // Add ApiTags decorator to group endpoints in Swagger
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
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
}
