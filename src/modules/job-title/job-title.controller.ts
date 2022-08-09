import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateJobTitleDto } from './job-title.dto';
import { JobTitleService } from './job-title.service';

@UseGuards(JwtAuthGuard)
@Controller('job-title')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Get()
  getJobTitle(@Param('key') key) {
    return this.jobTitleService.getJobTitleByKey(key);
  }

  @Post()
  async createJobTitle(@Body() data: CreateJobTitleDto) {
    await this.jobTitleService.createJobTitle(data);
  }
}
