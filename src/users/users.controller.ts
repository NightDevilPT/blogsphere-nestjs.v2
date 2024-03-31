import { Controller, Post, Body, UsePipes, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailValidationPipe } from 'src/pipes/email-validate.pipe';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/impl/create-user.command';
import { VerifyUserCommand } from './command/impl/verify-user.command';
import { LoginUserCommand } from './command/impl/login-user.command';
import { LoginDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/create')
  @UsePipes(new EmailValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Put('/verify')
  updateData(@Query('token') token: string) {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  @Post('login')
  @UsePipes(new EmailValidationPipe())
  async login(@Body() loginUserPayload: LoginDto) {
    return this.commandBus.execute(new LoginUserCommand(loginUserPayload));
  }
}
