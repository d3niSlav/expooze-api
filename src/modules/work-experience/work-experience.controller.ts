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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateWorkExperienceDto,
  EditWorkExperienceDto,
  WorkExperienceDto,
} from './work-experience.dto';
import { WorkExperienceService } from './work-experience.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { WorkExperience } from './work-experience.entity';

@ApiTags('workExperience')
// @UseGuards(JwtAuthGuard)
@Controller('workExperience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a workExperience' })
  async createWorkExperience(
    @Body() data: CreateWorkExperienceDto,
  ): Promise<SuccessResponseDto<WorkExperienceDto>> {
    const workExperience =
      await this.workExperienceService.createWorkExperience(data);

    return {
      message: SUCCESS,
      data: workExperience,
    };
  }

  @ApiOperation({ summary: 'Read a workExperience by ID' })
  @Get(':id')
  async readWorkExperience(
    @Param('id') id,
  ): Promise<SuccessResponseDto<WorkExperienceDto>> {
    const workExperience = await this.workExperienceService.readWorkExperience(
      id,
    );

    return {
      message: SUCCESS,
      data: workExperience,
    };
  }

  @ApiOperation({ summary: 'Update a workExperience' })
  @Put(':id')
  async updateWorkExperience(
    @Param('id') id,
    @Body() data: EditWorkExperienceDto,
  ): Promise<SuccessResponseDto<WorkExperienceDto>> {
    const workExperience =
      await this.workExperienceService.updateWorkExperience(id, data);

    return {
      message: SUCCESS,
      data: workExperience,
    };
  }

  @ApiOperation({ summary: 'Delete a workExperience' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.workExperienceService.deleteWorkExperience(id);

    return {
      message: SUCCESS,
    };
  }

  @ApiOperation({ summary: 'Read a list of workExperiences' })
  @Get()
  async readWorkExperiencesList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<WorkExperience[]>> {
    const workExperiences =
      await this.workExperienceService.readWorkExperiencesList(
        paginationParams,
        sortOrderParams,
        {},
        search,
      );

    return {
      message: SUCCESS,
      data: workExperiences.listData,
      pagination: workExperiences.pagination,
      sortOrder: sortOrderParams,
    };
  }
}
