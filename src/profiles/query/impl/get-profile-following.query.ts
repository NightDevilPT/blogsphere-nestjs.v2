import { IQuery } from '@nestjs/cqrs';

export class GetProfileFollowingQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
