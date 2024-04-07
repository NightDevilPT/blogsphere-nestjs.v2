import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileQuery } from '../impl/get-profile.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/services/pagination-service';

@Injectable()
@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private pagination: PaginationService,
  ) {}

  async execute({ page, limit }: GetProfileQuery): Promise<any> {
    const findAll = await this.profileRepository.find({ relations: ['user'] });
    return {
      message: 'data successfully fetched',
      data: this.pagination.paginateArray(findAll, page, limit),
    };
  }
}
