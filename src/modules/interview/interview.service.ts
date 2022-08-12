import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateInterviewDto,
  InterviewDto,
  UpdateInterviewDto,
} from './interview.dto';
import { Interview } from './interview.entity';
import { ProgrammingLanguageService } from '../programmingLanguage/programming-language.service';

@Injectable()
export class InterviewService {
  constructor(
    private programmingLanguagesService: ProgrammingLanguageService,
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
  ) {}

  async createInterview(
    interviewData: CreateInterviewDto,
  ): Promise<InterviewDto> {
    const { programmingLanguageId, ...interview } = interviewData;

    const programmingLanguage =
      await this.programmingLanguagesService.readProgrammingLanguage(
        programmingLanguageId,
      );
    const newInterview = await this.interviewsRepository.create({
      ...interview,
      programmingLanguage,
    });

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
    const { programmingLanguageId, ...newInterviewData } = interviewData;

    const programmingLanguage =
      await this.programmingLanguagesService.readProgrammingLanguage(
        programmingLanguageId,
      );

    const interview = await this.readInterview(id);

    return await this.interviewsRepository.save({
      ...interview,
      ...newInterviewData,
      id,
      programmingLanguage,
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
