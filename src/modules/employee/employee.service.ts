import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from './employee.dto';
import { Employee } from './employee.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async createEmployee(employeeData: CreateEmployeeDto): Promise<EmployeeDto> {
    const newEmployee = await this.employeesRepository.create(employeeData);

    const employee = await this.employeesRepository.save(newEmployee);

    return this.readEmployee(employee.id);
  }

  async readEmployee(id: string): Promise<EmployeeDto> {
    const employee: EmployeeDto = await this.employeesRepository.findOneBy({
      id,
    });

    if (!employee) {
      throw new HttpException('Employee not found!', HttpStatus.NOT_FOUND);
    }

    return employee;
  }

  async updateEmployee(
    id: string,
    employeeData: UpdateEmployeeDto,
  ): Promise<EmployeeDto> {
    const employee = await this.readEmployee(id);

    return await this.employeesRepository.save({
      ...employee,
      ...employeeData,
      id,
    });
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const { affected } = await this.employeesRepository.delete(id);

    if (affected === 0) {
      throw new HttpException('Employee not found!', HttpStatus.NOT_FOUND);
    }

    return affected === 1;
  }

  async readEmployeesList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<EmployeeDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.employeesRepository.findAndCount({
      take,
      skip,
      order: { [sortBy]: order },
    });

    return {
      listData: result,
      pagination: {
        ...paginationParams,
        totalCount: total,
        totalPages: getTotalPages(total, paginationParams.limit),
      },
      sortOrder: await prepareSortOrder(sortOrderDto, this.employeesRepository),
    };
  }
}
