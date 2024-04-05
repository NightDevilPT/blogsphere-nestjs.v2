import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { UpdateProfileCommand } from '../impl/update-profile.command';

@Injectable()
@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<any> {
    const { payload, id } = command;
    const profile = await this.profileRepository.findOne({ where: { id } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    Object.assign(profile, payload);
    const updatedProfile = await this.profileRepository.save(profile);

    return {
      message: 'Profile successfully updated',
      data: updatedProfile,
    };
  }
}
