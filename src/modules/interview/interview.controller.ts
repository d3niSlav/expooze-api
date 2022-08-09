import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateInterviewDto, UpdateInterviewDto } from './interview.dto';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  createInterview(@Body() data: CreateInterviewDto) {
    return this.interviewService.createInterview(data);
  }

  @Get()
  readAllInterviews() {
    return this.interviewService.readAllInterviews();
  }

  @Get(':id')
  readInterview(@Param('id') id) {
    return this.interviewService.readInterview(id);
  }

  @Put(':id')
  updateInterview(@Param('id') id, @Body() data: UpdateInterviewDto) {
    return this.interviewService.updateInterview(id, data);
  }

  @Delete(':id')
  deleteInterview(@Param('id') id) {
    return this.interviewService.deleteInterview(id);
  }
}
