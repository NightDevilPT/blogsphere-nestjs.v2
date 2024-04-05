import { ICommand } from '@nestjs/cqrs';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly payload: UpdateProfileDto,
    public readonly id: string,
  ) {}
}
