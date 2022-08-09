import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';

import { CreateJobTitleDto } from './job-title.dto';
import { JobTitle } from './job-title.entity';

@Injectable()
export class JobTitleService {
  constructor(
    @InjectRepository(JobTitle)
    private jobTitlesRepository: Repository<JobTitle>,
  ) {}

  async createJobTitle(jobTitleData: CreateJobTitleDto) {
    const data = {
      ...jobTitleData,
      key: slugify(jobTitleData.title, { lower: true }),
    };

    const newJobTitle = await this.jobTitlesRepository.create(data);

    await this.jobTitlesRepository.save(newJobTitle);

    return newJobTitle;
  }

  async getJobTitleByKey(key: string) {
    const jobTitle = await this.jobTitlesRepository.findOne({ key });

    if (!jobTitle) {
      throw new HttpException('Job title not found!', HttpStatus.NOT_FOUND);
    }

    return jobTitle;
  }
}
