import { Controller, Post, Body, UsePipes, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailValidationPipe } from 'src/pipes/email-validate.pipe';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/impl/create-user.command';
import { VerifyUserCommand } from './command/impl/verify-user.command';
import { LoginUserCommand } from './command/impl/login-user.command';
import { LoginDto } from './dto/login-user.dto';
import { ForgetUserCommand } from './command/impl/forget-password.command';
import { UpdateUserPasswordCommand } from './command/impl/update-user-password.command';
import { UpdateUserPasswordDto } from './dto/update-password-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create')
  @UsePipes(new EmailValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Post('login')
  @UsePipes(new EmailValidationPipe())
  async login(@Body() loginUserPayload: LoginDto) {
    return this.commandBus.execute(new LoginUserCommand(loginUserPayload));
  }

  @Put('forget-password')
  @UsePipes(new EmailValidationPipe())
  async forgetPassword(@Query('email') email: string) {
    return this.commandBus.execute(new ForgetUserCommand(email));
  }

  @Put('/verify')
  async forgetPasswordLink(@Query('token') token: string) {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  @Put('/update-password')
  async updatePassword(
    @Query('token') token: string,
    @Body() passwordPayload: UpdateUserPasswordDto,
  ) {
    return this.commandBus.execute(
      new UpdateUserPasswordCommand(token, passwordPayload.password),
    );
  }
}
