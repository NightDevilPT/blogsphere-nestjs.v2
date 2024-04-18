import { ICommand } from '@nestjs/cqrs';

export class UpdateProfileFollowCommand implements ICommand {
  constructor(
    public readonly profileId: string,
    public readonly userId: string,
  ) {}
}
