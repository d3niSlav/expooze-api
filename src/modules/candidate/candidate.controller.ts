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
  CreateCandidateDto,
  UpdateCandidateDto,
  CandidateDto,
} from './candidate.dto';
import { CandidateService } from './candidate.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { Candidate } from './candidate.entity';

@ApiTags('candidate')
// @UseGuards(JwtAuthGuard)
@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @ApiOperation({
    summary: 'Read a list of all candidates',
  })
  @Get('/list')
  async readAllCandidates(): Promise<
    SuccessResponseDto<
      Pick<CandidateDto, 'id' | 'firstName' | 'lastName' | 'email'>[]
    >
  > {
    const candidatesList = await this.candidateService.readAllCandidates();

    return {
      message: SUCCESS,
      data: candidatesList,
    };
  }

  @ApiOperation({ summary: 'Read a list of candidates' })
  @Get()
  async readCandidatesList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<Candidate[]>> {
    const candidates = await this.candidateService.readCandidatesList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: candidates.listData,
      pagination: candidates.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a candidate' })
  async createCandidate(
    @Body() data: CreateCandidateDto,
  ): Promise<SuccessResponseDto<CandidateDto>> {
    const candidate = await this.candidateService.createCandidate(data);

    return {
      message: SUCCESS,
      data: candidate,
    };
  }

  @ApiOperation({ summary: 'Read a candidate by ID' })
  @Get(':id')
  async readCandidate(
    @Param('id') id,
  ): Promise<SuccessResponseDto<CandidateDto>> {
    const candidate = await this.candidateService.readCandidate(id);

    return {
      message: SUCCESS,
      data: candidate,
    };
  }

  @ApiOperation({ summary: 'Update a candidate' })
  @Put(':id')
  async updateCandidate(
    @Param('id') id,
    @Body() data: UpdateCandidateDto,
  ): Promise<SuccessResponseDto<CandidateDto>> {
    const candidate = await this.candidateService.updateCandidate(id, data);

    return {
      message: SUCCESS,
      data: candidate,
    };
  }

  @ApiOperation({ summary: 'Delete a candidate' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.candidateService.deleteCandidate(id);

    return {
      message: SUCCESS,
    };
  }
}
