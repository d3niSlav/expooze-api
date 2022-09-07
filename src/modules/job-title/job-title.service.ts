import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';

import { CreateJobTitleDto, EditJobTitleDto, JobTitleDto } from "./job-title.dto";
import { JobTitle } from './job-title.entity';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';

@Injectable()
export class JobTitleService {
  constructor(
    @InjectRepository(JobTitle)
    private jobTitlesRepository: Repository<JobTitle>,
  ) {}

  async createJobTitle(jobTitleData: CreateJobTitleDto): Promise<JobTitleDto> {
    const newJobTitle = await this.jobTitlesRepository.create({
      ...jobTitleData,
    });

    const jobTitle = await this.jobTitlesRepository.save(newJobTitle);

    return this.readJobTitle(jobTitle.id);
  }

  async readJobTitle(id: string): Promise<JobTitleDto> {
    const jobTitle = await this.jobTitlesRepository.findOneBy({ id });

    if (!jobTitle) {
      throw new HttpException('Job title not found!', HttpStatus.NOT_FOUND);
    }

    return jobTitle;
  }

  async updateJobTitle(
    id: string,
    jobTitleData: EditJobTitleDto,
  ): Promise<JobTitleDto> {
    const jobTitle = await this.readJobTitle(id);

    return this.jobTitlesRepository.save({
      ...jobTitle,
      ...jobTitleData,
    });
  }

  async deleteJobTitle(id: string): Promise<boolean> {
    const { affected } = await this.jobTitlesRepository.delete(id);

    if (affected === 0) {
      throw new HttpException(
        'Job title not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return affected === 1;
  }

  async readJobTitlesList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<JobTitle>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.jobTitlesRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.jobTitlesRepository),
    };
  }
}
