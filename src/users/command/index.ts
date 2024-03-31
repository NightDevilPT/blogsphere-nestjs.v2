import { CreateUserHandler } from './handler/create-user.command.handler';
import { LoginUserCommandHandler } from './handler/login-user.command.handler';
import { VerifyUserCommandHandler } from './handler/verify-user.command.handler';

export const allCommandHandlers = [
  CreateUserHandler,
  VerifyUserCommandHandler,
  LoginUserCommandHandler,
];
