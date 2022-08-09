import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateSubjectDto, UpdateSubjectDto } from './subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  createSubject(@Body() data: CreateSubjectDto) {
    return this.subjectService.createSubject(data);
  }

  @Get()
  readAllSubjects() {
    return this.subjectService.readAllSubjects();
  }

  @Get(':id')
  readSubject(@Param('id') id) {
    return this.subjectService.readSubject(id);
  }

  @Put(':id')
  updateSubject(@Param('id') id, @Body() data: UpdateSubjectDto) {
    return this.subjectService.updateSubject(id, data);
  }

  @Delete(':id')
  deleteSubject(@Param('id') id) {
    return this.subjectService.deleteSubject(id);
  }
}
