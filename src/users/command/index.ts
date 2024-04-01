import { CreateUserHandler } from './handler/create-user.command.handler';
import { ForgetUserCommandHandler } from './handler/forget-password-user.command.handler';
import { LoginUserCommandHandler } from './handler/login-user.command.handler';
import { UpdateUserPasswordCommandHandler } from './handler/update-user-password.command.handler';
import { VerifyUserCommandHandler } from './handler/verify-user.command.handler';

export const allCommandHandlers = [
  CreateUserHandler,
  VerifyUserCommandHandler,
  LoginUserCommandHandler,
  ForgetUserCommandHandler,
  UpdateUserPasswordCommandHandler,
];
