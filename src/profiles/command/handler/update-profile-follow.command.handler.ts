import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Follow } from 'src/profiles/entities/profile-follow.entity';
import { UpdateProfileFollowCommand } from '../impl/update-profile-follow.command';

@Injectable()
@CommandHandler(UpdateProfileFollowCommand)
export class UpdateProfileFollowHandler
  implements ICommandHandler<UpdateProfileFollowCommand>
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async execute(command: UpdateProfileFollowCommand): Promise<any> {
    const { profileId, userId } = command;

    const followedTo = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['user'],
    });

    const followedBy = await this.profileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!followedTo || !followedBy) {
      throw new NotFoundException('Profile not found');
    }

    const existingFollow = await this.followRepository.findOne({
      where: {
        followedBy: {
          id: followedBy.id,
        },
        followedTo: {
          id: followedTo.id,
        },
      },
    });

    if (existingFollow) {
      const status = existingFollow.status === 'active' ? 'inactive' : 'active';
      existingFollow.status = status;
      await this.followRepository.save(existingFollow);
      return {
        message: `you ${status === 'active' ? 'follow' : 'unfollow'} this ${followedTo.user.username}`,
      };
    }

    const newFollow = this.followRepository.create({
      followedTo,
      followedBy,
      status: 'active',
    });
    await this.followRepository.save(newFollow);
    return { message: `you follow this ${followedTo.user.username}` };
  }
}
