import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateQuestionDto, UpdateQuestionDto } from './question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(@Body() data: CreateQuestionDto) {
    return this.questionService.createQuestion(data);
  }

  @Get()
  readAllQuestions() {
    return this.questionService.readAllQuestions();
  }

  @Get(':id')
  readQuestion(@Param('id') id) {
    return this.questionService.readQuestion(id);
  }

  @Put(':id')
  updateQuestion(@Param('id') id, @Body() data: UpdateQuestionDto) {
    return this.questionService.updateQuestion(id, data);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id) {
    return this.questionService.deleteQuestion(id);
  }
}
