import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { GetProfileByIdQuery } from '../impl/get-profile-by-id.query';

@Injectable()
@QueryHandler(GetProfileByIdQuery)
export class GetProfileByIdHandler
  implements IQueryHandler<GetProfileByIdQuery>
{
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async execute({ profileId }: GetProfileByIdQuery): Promise<any> {
    const findProfileData = await this.profileRepository.find({
      where: { id: profileId },
      relations: ['blogs', 'user'],
    });
    return {
      message: 'data successfully fetched',
      data: findProfileData,
    };
  }
}
