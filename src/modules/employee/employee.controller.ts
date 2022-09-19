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
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  EmployeeDto,
} from './employee.dto';
import { EmployeeService } from './employee.service';
import { SUCCESS } from '../../utils/constants';
import {
  BasicSuccessResponseDto,
  PaginationParamsDto,
  SortOrderDto,
  SuccessResponseDto,
} from '../../utils/types';
import { Employee } from './employee.entity';

@ApiTags('employee')
// @UseGuards(JwtAuthGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/list')
  async readAllEmployees(): Promise<
    SuccessResponseDto<Pick<EmployeeDto, 'id'>[]>
  > {
    const employees = await this.employeeService.readAllEmployees();

    return {
      message: SUCCESS,
      data: employees,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a employee' })
  async createEmployee(
    @Body() data: CreateEmployeeDto,
  ): Promise<SuccessResponseDto<EmployeeDto>> {
    const employee = await this.employeeService.createEmployee(data);

    return {
      message: SUCCESS,
      data: employee,
    };
  }

  @ApiOperation({ summary: 'Read a employee by ID' })
  @Get(':id')
  async readEmployee(
    @Param('id') id,
  ): Promise<SuccessResponseDto<EmployeeDto>> {
    const employee = await this.employeeService.readEmployee(id);

    return {
      message: SUCCESS,
      data: employee,
    };
  }

  @ApiOperation({ summary: 'Update a employee' })
  @Put(':id')
  async updateEmployee(
    @Param('id') id,
    @Body() data: UpdateEmployeeDto,
  ): Promise<SuccessResponseDto<EmployeeDto>> {
    const employee = await this.employeeService.updateEmployee(id, data);

    return {
      message: SUCCESS,
      data: employee,
    };
  }

  @ApiOperation({ summary: 'Delete a employee' })
  @Delete(':id')
  async deleteInterviewAnswer(
    @Param('id') id,
  ): Promise<BasicSuccessResponseDto> {
    await this.employeeService.deleteEmployee(id);

    return {
      message: SUCCESS,
    };
  }

  @ApiOperation({ summary: 'Read a list of employees' })
  @Get()
  async readEmployeesList(
    @Query() paginationParams: PaginationParamsDto,
    @Query() sortOrderParams: SortOrderDto,
    @Query('search') search?: string,
  ): Promise<SuccessResponseDto<Employee[]>> {
    const employees = await this.employeeService.readEmployeesList(
      paginationParams,
      sortOrderParams,
      {},
      search,
    );

    return {
      message: SUCCESS,
      data: employees.listData,
      pagination: employees.pagination,
      sortOrder: sortOrderParams,
    };
  }
}
