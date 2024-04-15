import {
  Controller,
  Post,
  Body,
  UsePipes,
  Put,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { EmailValidationPipe } from 'src/pipes/email-validate.pipe';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/impl/create-user.command';
import { VerifyUserCommand } from './command/impl/verify-user.command';
import { LoginUserCommand } from './command/impl/login-user.command';
import { LoginDto } from './dto/login-user.dto';
import { ForgetUserCommand } from './command/impl/forget-password.command';
import { UpdateUserPasswordCommand } from './command/impl/update-user-password.command';
import { UpdateUserPasswordDto } from './dto/update-password-user.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new user' })
  @UsePipes(new EmailValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  @UsePipes(new EmailValidationPipe())
  async login(@Body() loginUserPayload: LoginDto) {
    return this.commandBus.execute(new LoginUserCommand(loginUserPayload));
  }

  @Put('forget-password')
  @ApiOperation({ summary: 'resent forget password link to update password' })
  @UsePipes(new EmailValidationPipe())
  async forgetPassword(@Query('email') email: string) {
    return this.commandBus.execute(new ForgetUserCommand(email));
  }

  @Put('/verify')
  @ApiOperation({ summary: 'verify new user' })
  async forgetPasswordLink(@Query('token') token: string) {
    return this.commandBus.execute(new VerifyUserCommand(token));
  }

  @Put('/update-password')
  @ApiOperation({ summary: 'Update password via token' })
  async updatePassword(
    @Query('token') token: string,
    @Body() passwordPayload: UpdateUserPasswordDto,
  ) {
    return this.commandBus.execute(
      new UpdateUserPasswordCommand(token, passwordPayload.password),
    );
  }

  @Delete()
  @ApiOperation({ summary: 'sent delete link request' })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  async deleteUserRequest() {
    console.log('deleted account token sent');
    return 'deleted account token sent';
  }

  @Delete('/delete-account')
  @ApiOperation({ summary: 'Delete a user' })
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiBearerAuth()
  async deleteUser(@Query('token') token: string) {
    console.log('deleted account', token);
    return 'deleted account';
  }
}
