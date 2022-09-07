import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateQuestionDto,
  EditQuestionDto,
  QuestionDto,
} from './question.dto';
import { Question } from './question.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async createQuestion(questionData: CreateQuestionDto): Promise<QuestionDto> {
    const newQuestion = await this.questionsRepository.create(questionData);

    const question = await this.questionsRepository.save(newQuestion);

    return this.readQuestion(question.id);
  }

  async readQuestion(id: string): Promise<QuestionDto> {
    const question: QuestionDto = await this.questionsRepository.findOneBy({
      id,
    });

    if (!question) {
      throw new HttpException('Question not found!', HttpStatus.NOT_FOUND);
    }

    return question;
  }

  async updateQuestion(
    id: string,
    questionData: EditQuestionDto,
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

  async readQuestionsList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<QuestionDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.questionsRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
      relations: ['topics'],
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.questionsRepository),
    };
  }

  async readAllQuestions(): Promise<QuestionDto[]> {
    return await this.questionsRepository.find();
  }
}
