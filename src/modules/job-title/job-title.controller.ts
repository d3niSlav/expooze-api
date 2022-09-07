import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateJobTitleDto,
  EditJobTitleDto,
  JobTitleDto,
} from './job-title.dto';
import { JobTitleService } from './job-title.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { JobTitle } from './job-title.entity';

@ApiTags('job-title')
// @UseGuards(JwtAuthGuard)
@Controller('job-title')
export class JobTitleController {
  constructor(private readonly jobTitleService: JobTitleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a job title' })
  async createJobTitle(
    @Body() data: CreateJobTitleDto,
  ): Promise<SuccessResponseDto<JobTitleDto>> {
    const jobTitle = await this.jobTitleService.createJobTitle(data);

    return {
      message: SUCCESS,
      data: jobTitle,
    };
  }

  @ApiOperation({ summary: 'Read a job title by ID' })
  @Get(':id')
  async readJobTitle(
    @Param('id') id,
  ): Promise<SuccessResponseDto<JobTitleDto>> {
    const jobTitle = await this.jobTitleService.readJobTitle(id);

    return {
      message: SUCCESS,
      data: jobTitle,
    };
  }

  @ApiOperation({ summary: 'Update a job title' })
  @Put(':id')
  async updateJobTitle(
    @Param('id') id,
    @Body() data: EditJobTitleDto,
  ): Promise<SuccessResponseDto<JobTitleDto>> {
    const jobTitle = await this.jobTitleService.updateJobTitle(id, data);

    return {
      message: SUCCESS,
      data: jobTitle,
    };
  }

  @ApiOperation({ summary: 'Delete a job title' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.jobTitleService.deleteJobTitle(id);

    return {
      message: SUCCESS,
    };
  }

  @ApiOperation({ summary: 'Read a list of job titles' })
  @Get()
  async readJobTitlesList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<JobTitle[]>> {
    console.log(paginationParams);
    console.log(sortOrderParams);
    const jobTitles = await this.jobTitleService.readJobTitlesList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: jobTitles.listData,
      pagination: jobTitles.pagination,
      sortOrder: sortOrderParams,
    };
  }
}
