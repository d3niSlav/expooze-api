import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateInterviewDto,
  InterviewDto,
  UpdateInterviewDto,
} from './interview.dto';
import { Interview } from './interview.entity';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
  ) {}

  async createInterview(
    interviewData: CreateInterviewDto,
  ): Promise<InterviewDto> {
    const newInterview = await this.interviewsRepository.create(interviewData);

    return await this.interviewsRepository.save(newInterview);
  }

  async readInterview(id: string): Promise<InterviewDto> {
    const interview: InterviewDto = await this.interviewsRepository.findOneBy({
      id,
    });

    if (!interview) {
      throw new HttpException('Interview not found!', HttpStatus.NOT_FOUND);
    }

    return interview;
  }

  async readAllInterviews(): Promise<InterviewDto[]> {
    return await this.interviewsRepository.find();
  }

  async updateInterview(
    id: string,
    interviewData: UpdateInterviewDto,
  ): Promise<InterviewDto> {
    const interview = await this.readInterview(id);

    return await this.interviewsRepository.save({
      ...interview,
      ...interviewData,
      id,
    });
  }

  async deleteInterview(id: string): Promise<boolean> {
    const { affected } = await this.interviewsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Interview not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}
