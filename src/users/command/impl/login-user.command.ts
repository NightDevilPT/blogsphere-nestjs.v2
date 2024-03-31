import { ICommand } from '@nestjs/cqrs';
import { loginUserInterface } from 'src/users/interface/user.interface';

export class LoginUserCommand implements ICommand {
  constructor(public readonly loginPayload: loginUserInterface) {}
}
