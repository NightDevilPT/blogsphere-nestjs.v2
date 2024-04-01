import { ICommand } from '@nestjs/cqrs';

export class UpdateUserPasswordCommand implements ICommand {
  constructor(
    public readonly token: string,
    public readonly password: string,
  ) {}
}
