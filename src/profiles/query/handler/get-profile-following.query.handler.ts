import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from 'src/profiles/entities/profile-follow.entity';
import { GetProfileFollowingQuery } from '../impl/get-profile-following.query';
import { User } from 'src/users/entities/user.entity';

@Injectable()
@QueryHandler(GetProfileFollowingQuery)
export class GetProfileFollowingHandler
  implements IQueryHandler<GetProfileFollowingQuery>
{
  constructor(
    @InjectRepository(Follow)
    private followRepo: Repository<Follow>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async execute({ userId }: GetProfileFollowingQuery): Promise<any> {
    const findUser = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    const findFollowing = await this.followRepo.find({
      where: { followedBy: { id: findUser.profile.id }, status: 'active' },
      relations: { followedBy: true, followedTo: true },
    });

    return {
      message: 'data successfully fetched',
      data: findFollowing,
      following: findFollowing.length,
    };
  }
}
