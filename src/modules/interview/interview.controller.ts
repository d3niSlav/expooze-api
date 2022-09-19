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

import { CreateInterviewDto, UpdateInterviewDto } from './interview.dto';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a interview' })
  async createInterview(
    @Body() data: CreateInterviewDto,
  ): Promise<SuccessResponseDto<Interview>> {
    const interview = await this.interviewService.createInterview(data);

    return {
      message: SUCCESS,
      data: interview,
    };
  }

  @ApiOperation({ summary: 'Read an interview by ID' })
  @Get(':id')
  async readInterview(@Param('id') id): Promise<SuccessResponseDto<Interview>> {
    const interview = await this.interviewService.readInterview(id);

    return {
      message: SUCCESS,
      data: interview,
    };
  }

  @ApiOperation({ summary: 'Update an interview' })
  @Put(':id')
  async updateInterview(
    @Param('id') id,
    @Body() data: UpdateInterviewDto,
  ): Promise<SuccessResponseDto<Interview>> {
    const interview = await this.interviewService.updateInterview(id, data);

    return {
      message: SUCCESS,
      data: interview,
    };
  }

  @ApiOperation({ summary: 'Delete an interview' })
  @Delete(':id')
  async deleteInterview(@Param('id') id): Promise<BasicSuccessResponseDto> {
    await this.interviewService.deleteInterview(id);

    return {
      message: SUCCESS,
    };
  }

  @ApiOperation({ summary: 'Read a list of interviews' })
  @Get()
  async readInterviewsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<Interview[]>> {
    console.log(paginationParams);
    console.log(sortOrderParams);
    const interviews = await this.interviewService.readInterviewsList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: interviews.listData,
      pagination: interviews.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Get('/list')
  readAllInterviews() {
    return this.interviewService.readAllInterviews();
  }
}
