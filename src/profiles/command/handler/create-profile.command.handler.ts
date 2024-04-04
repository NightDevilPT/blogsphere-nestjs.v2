import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateProfileCommand } from '../impl/create-profile.command';

@Injectable()
@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(command: CreateProfileCommand): Promise<any> {
    const { payload, userId } = command;
    const userData = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (userData.profile) {
      throw new ConflictException('User already has a profile');
    }
    const createProfile = await this.profileRepository.create({
      ...payload,
      user: userData,
    });
    const saveProfile = await this.profileRepository.save(createProfile);
    return {
      data: saveProfile,
      message: 'profile successfully created',
    };
  }
}
