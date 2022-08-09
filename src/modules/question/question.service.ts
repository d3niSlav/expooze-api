import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateQuestionDto,
  QuestionDto,
  UpdateQuestionDto,
} from './question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async createQuestion(questionData: CreateQuestionDto): Promise<QuestionDto> {
    const newQuestion = await this.questionsRepository.create(questionData);

    return await this.questionsRepository.save(newQuestion);
  }

  async readQuestion(id: string): Promise<QuestionDto> {
    const question: QuestionDto = await this.questionsRepository.findOne(id);

    if (!question) {
      throw new HttpException('Question not found!', HttpStatus.NOT_FOUND);
    }

    return question;
  }

  async readAllQuestions(): Promise<QuestionDto[]> {
    return await this.questionsRepository.find();
  }

  async updateQuestion(
    id: string,
    questionData: UpdateQuestionDto,
  ): Promise<QuestionDto> {
    const question = await this.readQuestion(id);

    return await this.questionsRepository.save({
      ...question,
      ...questionData,
      id,
    });
  }

  async deleteQuestion(id: string): Promise<boolean> {
    const { affected } = await this.questionsRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Question not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }
}
