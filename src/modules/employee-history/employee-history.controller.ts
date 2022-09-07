import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  SaveEmployeeHistoryDto,
  EmployeeHistoryDto,
} from './employee-history.dto';
import { EmployeeHistoryService } from './employee-history.service';
import { SUCCESS } from '../../utils/constants';
import {
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { EmployeeHistory } from './employee-history.entity';

@ApiTags('employeeHistory')
// @UseGuards(JwtAuthGuard)
@Controller('employeeHistory')
export class EmployeeHistoryController {
  constructor(
    private readonly employeeHistoryService: EmployeeHistoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Save an employee history' })
  async createEmployeeHistory(
    @Body() data: SaveEmployeeHistoryDto,
  ): Promise<SuccessResponseDto<EmployeeHistoryDto>> {
    const employeeHistory =
      await this.employeeHistoryService.createEmployeeHistory(data);

    return {
      message: SUCCESS,
      data: employeeHistory,
    };
  }

  @ApiOperation({ summary: 'Read a list of the employee history changes' })
  @Get()
  async readEmployeeHistorysList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<EmployeeHistory[]>> {
    const employeeHistory =
      await this.employeeHistoryService.readEmployeeHistoryList(
        paginationParams,
        sortOrderParams,
        {},
        search,
      );

    return {
      message: SUCCESS,
      data: employeeHistory.listData,
      pagination: employeeHistory.pagination,
      sortOrder: sortOrderParams,
    };
  }
}
