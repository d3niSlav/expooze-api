import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateInterviewAnswerDto,
  UpdateInterviewAnswerDto,
} from './interview-answer.dto';
import { InterviewAnswerService } from './interview-answer.service';

@Controller('interviewAnswer')
export class InterviewAnswerController {
  constructor(
    private readonly interviewAnswerService: InterviewAnswerService,
  ) {}

  @Post()
  createInterviewAnswer(@Body() data: CreateInterviewAnswerDto) {
    return this.interviewAnswerService.createInterviewAnswer(data);
  }

  @Post('list')
  readAllInterviewAnswers(@Body() filter) {
    return this.interviewAnswerService.readAllInterviewAnswers(filter);
  }

  @Get(':id')
  readInterviewAnswer(@Param('id') id) {
    return this.interviewAnswerService.readInterviewAnswer(id);
  }

  @Put(':id')
  updateInterviewAnswer(
    @Param('id') id,
    @Body() data: UpdateInterviewAnswerDto,
  ) {
    return this.interviewAnswerService.updateInterviewAnswer(id, data);
  }

  @Delete(':id')
  deleteInterviewAnswer(@Param('id') id) {
    return this.interviewAnswerService.deleteInterviewAnswer(id);
  }
}
