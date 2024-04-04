import { ICommand } from '@nestjs/cqrs';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';

export class CreateProfileCommand implements ICommand {
  constructor(
    public readonly payload: CreateProfileDto,
    public readonly userId: string,
  ) {}
}
