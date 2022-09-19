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

import { CreateSubjectDto, EditSubjectDto, SubjectDto } from './subject.dto';
import { SubjectService } from './subject.service';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { SUCCESS } from '../../utils/constants';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/list')
  async readAllSubjects(): Promise<
    SuccessResponseDto<Pick<SubjectDto, 'id' | 'title'>[]>
  > {
    const subjectsList = await this.subjectService.readAllSubjects();

    return {
      message: SUCCESS,
      data: subjectsList,
    };
  }

  @ApiOperation({ summary: 'Read a subject by ID' })
  @Get(':id')
  async readSubject(@Param('id') id): Promise<SuccessResponseDto<SubjectDto>> {
    const subject = await this.subjectService.readSubject(id);

    return {
      message: SUCCESS,
      data: subject,
    };
  }

  @ApiOperation({ summary: 'Read a list of subjects' })
  @Get()
  async readSubjectsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<SubjectDto[]>> {
    const subjects = await this.subjectService.readSubjectsList(
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

  @Post()
  @ApiOperation({ summary: 'Create a subject' })
  async createSubject(
    @Body() data: CreateSubjectDto,
  ): Promise<SuccessResponseDto<SubjectDto>> {
    const subject = await this.subjectService.createSubject(data);

    return {
      message: SUCCESS,
      data: subject,
    };
  }

  @ApiOperation({ summary: 'Update a subject' })
  @Put(':id')
  async updateSubject(
    @Param('id') id,
    @Body() data: EditSubjectDto,
  ): Promise<SuccessResponseDto<SubjectDto>> {
    const subject = await this.subjectService.updateSubject(id, data);

    return {
      message: SUCCESS,
      data: subject,
    };
  }

  @ApiOperation({ summary: 'Delete a subject' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.subjectService.deleteSubject(id);

    return {
      message: SUCCESS,
    };
  }
}
