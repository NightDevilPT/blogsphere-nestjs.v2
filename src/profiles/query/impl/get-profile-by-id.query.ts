import { IQuery } from '@nestjs/cqrs';

export class GetProfileByIdQuery implements IQuery {
  constructor(
    public readonly profileId: string,
    public readonly token?: boolean,
  ) {}
}
