import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  CreateInterviewAnswerDto,
  InterviewAnswerDto,
  UpdateInterviewAnswerDto,
} from './interview-answer.dto';
import { InterviewAnswer } from './interview-answer.entity';
import { InterviewService } from '../interview/interview.service';

@Injectable()
export class InterviewAnswerService {
  constructor(
    private interviewsService: InterviewService,
    @InjectRepository(InterviewAnswer)
    private interviewAnswersRepository: Repository<InterviewAnswer>,
  ) {}

  async createInterviewAnswer(
    interviewAnswerData: CreateInterviewAnswerDto,
  ): Promise<InterviewAnswerDto> {
    const { interviewId, ...newInterview } = interviewAnswerData;

    const interview = await this.interviewsService.readInterview(interviewId);

    const newInterviewAnswer = await this.interviewAnswersRepository.create({
      ...newInterview,
      interview,
    });

    return await this.interviewAnswersRepository.save(newInterviewAnswer);
  }

  async readInterviewAnswer(id: string): Promise<InterviewAnswerDto> {
    const interviewAnswer: InterviewAnswerDto =
      await this.interviewAnswersRepository.findOneBy({ id });

    if (!interviewAnswer) {
      throw new HttpException(
        'Interview answer not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return interviewAnswer;
  }

  async readAllInterviewAnswers(filters?: {
    ids?: string[];
  }): Promise<InterviewAnswerDto[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.interviewAnswersRepository.find({ where: filter });
  }

  async updateInterviewAnswer(
    id: string,
    interviewAnswerData: UpdateInterviewAnswerDto,
  ): Promise<InterviewAnswerDto> {
    const { interviewId, ...newInterview } = interviewAnswerData;

    const interviewAnswer = await this.readInterviewAnswer(id);
    let interview = interviewAnswer.interview;

    if (interviewId !== interview.id) {
      interview = await this.interviewsService.readInterview(interviewId);
    }

    return await this.interviewAnswersRepository.save({
      ...interviewAnswer,
      ...newInterview,
      interview,
    });
  }

  async deleteInterviewAnswer(id: string): Promise<boolean> {
    const { affected } = await this.interviewAnswersRepository.delete(id);

    if (affected === 0) {
      throw new HttpException(
        'Interview answer not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return affected === 1;
  }
}
