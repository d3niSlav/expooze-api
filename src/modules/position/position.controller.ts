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

import {
  CreatePositionDto,
  PositionDto,
  UpdatePositionDto,
} from './position.dto';
import { PositionService } from './position.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiOperation({
    summary: 'Read a list of all open job positions - id and title only',
  })
  @Get('/list')
  async readAllPositionsTitles(): Promise<
    SuccessResponseDto<Pick<PositionDto, 'id' | 'title'>[]>
  > {
    const jobPositionsList = await this.positionService.readAllPositions();

    return {
      message: SUCCESS,
      data: jobPositionsList,
    };
  }

  @ApiOperation({ summary: 'Read a list of open job positions' })
  @Get()
  async readJobPositionsList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<PositionDto[]>> {
    const jobPositions = await this.positionService.readPositionsList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: jobPositions.listData,
      pagination: jobPositions.pagination,
      sortOrder: sortOrderParams,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create an open job position' })
  async createPosition(
    @Body() data: CreatePositionDto,
  ): Promise<SuccessResponseDto<PositionDto>> {
    const jobPosition = await this.positionService.createPosition(data);

    return {
      message: SUCCESS,
      data: jobPosition,
    };
  }

  @ApiOperation({ summary: 'Read an open job position by ID' })
  @Get(':id')
  async readJobTitle(
    @Param('id') id,
  ): Promise<SuccessResponseDto<PositionDto>> {
    const jobPosition = await this.positionService.readPosition(id);

    return {
      message: SUCCESS,
      data: jobPosition,
    };
  }

  @ApiOperation({ summary: 'Update an open job position' })
  @Put(':id')
  async updatePosition(
    @Param('id') id,
    @Body() data: UpdatePositionDto,
  ): Promise<SuccessResponseDto<PositionDto>> {
    const jobPosition = await this.positionService.updatePosition(id, data);

    return {
      message: SUCCESS,
      data: jobPosition,
    };
  }

  @ApiOperation({ summary: 'Delete an open job position' })
  @Delete(':id')
  async deletePosition(@Param('id') id): Promise<BasicSuccessResponseDto> {
    await this.positionService.deletePosition(id);

    return {
      message: SUCCESS,
    };
  }
}
