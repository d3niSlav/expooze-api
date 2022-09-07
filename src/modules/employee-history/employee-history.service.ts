import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  SaveEmployeeHistoryDto,
  EmployeeHistoryDto,
} from './employee-history.dto';
import { EmployeeHistory } from './employee-history.entity';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';

@Injectable()
export class EmployeeHistoryService {
  constructor(
    @InjectRepository(EmployeeHistory)
    private employeeHistoryRepository: Repository<EmployeeHistory>,
  ) {}

  async createEmployeeHistory(
    employeeHistoryData: SaveEmployeeHistoryDto,
  ): Promise<EmployeeHistoryDto> {
    const newEmployeeHistory = await this.employeeHistoryRepository.create(
      employeeHistoryData,
    );

    const employeeHistory = await this.employeeHistoryRepository.save(
      newEmployeeHistory,
    );

    return this.readEmployeeHistory(employeeHistory.id);
  }

  async readEmployeeHistory(id: string): Promise<EmployeeHistoryDto> {
    const employeeHistory: EmployeeHistoryDto =
      await this.employeeHistoryRepository.findOneBy({ id });

    if (!employeeHistory) {
      throw new HttpException(
        'Employee history not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    return employeeHistory;
  }

  async readEmployeeHistoryList(
    paginationParams: PaginationParamsDto,
    sortOrderDto: SortOrderDto,
    filters?: any,
    search?: string,
  ): Promise<ListDto<EmployeeHistoryDto>> {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const take = paginationParams.limit;
    const { order, sortBy } = sortOrderDto;

    const [result, total] = await this.employeeHistoryRepository.findAndCount({
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
      sortOrder: await prepareSortOrder(
        sortOrderDto,
        this.employeeHistoryRepository,
      ),
    };
  }
}
