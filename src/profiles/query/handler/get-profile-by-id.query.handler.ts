import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfileByIdQuery } from '../impl/get-profile-by-id.query';
import { GetProfileFollowersQuery } from '../impl/get-profile-followers.query';
import { GetProfileFollowingQuery } from '../impl/get-profile-following.query';

@Injectable()
@QueryHandler(GetProfileByIdQuery)
export class GetProfileByIdHandler
  implements IQueryHandler<GetProfileByIdQuery>
{
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ profileId, token }: GetProfileByIdQuery): Promise<any> {
    let findProfileData;
    if (token) {
      findProfileData = await this.profileRepository.findOne({
        where: { user: { id: profileId } },
        relations: ['user', 'blogs'],
      });
    } else {
      findProfileData = await this.profileRepository.findOne({
        where: { id: profileId },
        relations: ['user', 'blogs'],
      });
    }

    const following = await this.queryBus.execute(
      new GetProfileFollowersQuery(findProfileData.user.id),
    );

    const followers = await this.queryBus.execute(
      new GetProfileFollowingQuery(findProfileData.user.id),
    );

    return {
      message: 'data successfully fetched',
      data: {
        ...findProfileData,
        followers: followers.data,
        following: following.data,
        noOfFollowers: followers.data.length,
        noOfFollowing: following.data.length,
      },
    };
  }
}
