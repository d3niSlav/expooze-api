import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { QuestionService } from './question.service';
import {
  CreateQuestionDto,
  EditQuestionDto,
  QuestionDto,
} from './question.dto';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { SUCCESS } from '../../utils/constants';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Read a list of questions' })
  @Get()
  async readSubjectsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<QuestionDto[]>> {
    const subjects = await this.questionService.readQuestionsList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: subjects.listData,
      pagination: subjects.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Get('/list')
  readAllQuestions() {
    return this.questionService.readAllQuestions();
  }

  @Post()
  @ApiOperation({ summary: 'Create a question' })
  async createQuestion(
    @Body() data: CreateQuestionDto,
  ): Promise<SuccessResponseDto<QuestionDto>> {
    const question = await this.questionService.createQuestion(data);

    return {
      message: SUCCESS,
      data: question,
    };
  }

  @ApiOperation({ summary: 'Read a question by ID' })
  @Get(':id')
  async readQuestion(
    @Param('id') id,
  ): Promise<SuccessResponseDto<QuestionDto>> {
    const question = await this.questionService.readQuestion(id);

    return {
      message: SUCCESS,
      data: question,
    };
  }

  @ApiOperation({ summary: 'Update a question' })
  @Put(':id')
  async updateQuestion(
    @Param('id') id,
    @Body() data: EditQuestionDto,
  ): Promise<SuccessResponseDto<QuestionDto>> {
    const question = await this.questionService.updateQuestion(id, data);

    return {
      message: SUCCESS,
      data: question,
    };
  }

  @ApiOperation({ summary: 'Delete a question' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.questionService.deleteQuestion(id);

    return {
      message: SUCCESS,
    };
  }
}
