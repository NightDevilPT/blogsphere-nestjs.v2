import { ICommand } from '@nestjs/cqrs';

export class ForgetUserCommand implements ICommand {
  constructor(public readonly emailPayload: string) {}
}
