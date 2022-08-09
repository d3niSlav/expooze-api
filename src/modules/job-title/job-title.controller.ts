import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateJobTitleDto } from './job-title.dto';
import { JobTitleService } from './job-title.service';

@UseGuards(JwtAuthGuard)
@Controller('job-title')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Get(':id')
  readJobTitle(@Param('id') key) {
    return this.jobTitleService.readJobTitle(key);
  }

  @Post()
  async createJobTitle(@Body() data: CreateJobTitleDto) {
    await this.jobTitleService.createJobTitle(data);
  }
}
