import { IQuery } from '@nestjs/cqrs';

export class GetProfileFollowersQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
