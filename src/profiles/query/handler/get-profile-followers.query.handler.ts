import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from 'src/profiles/entities/profile-follow.entity';
import { GetProfileFollowersQuery } from '../impl/get-profile-followers.query';
import { User } from 'src/users/entities/user.entity';

@Injectable()
@QueryHandler(GetProfileFollowersQuery)
export class GetProfileFollowersHandler
  implements IQueryHandler<GetProfileFollowersQuery>
{
  constructor(
    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute({ userId }: GetProfileFollowersQuery): Promise<any> {
    const findUser = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    const findFollowers = await this.followRepo.find({
      where: { followedTo: { id: findUser.profile.id }, status: 'active' },
      relations: { followedBy: true, followedTo: true },
    });

    return {
      message: 'data successfully fetched',
      data: findFollowers,
      followers: findFollowers.length,
    };
  }
}
