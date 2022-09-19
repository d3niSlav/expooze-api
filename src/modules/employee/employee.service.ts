import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from "typeorm";

import {
  CreateEmployeeDto,
  EmployeeDto,
  UpdateEmployeeDto,
} from './employee.dto';
import { Employee } from './employee.entity';
import { CandidateService } from '../candidate/candidate.service';
import { JobTitleService } from '../job-title/job-title.service';
import { ListDto, PaginationParamsDto, SortOrderDto } from '../../utils/types';
import { getTotalPages, prepareSortOrder } from '../../utils/helpers';
import { SubjectDto } from "../subject/subject.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @Inject(forwardRef(() => CandidateService))
    private candidatesService: CandidateService,
    @Inject(forwardRef(() => JobTitleService))
    private jobTitlesService: JobTitleService,
  ) {}

  async createEmployee(employeeData: CreateEmployeeDto): Promise<EmployeeDto> {
    const { candidateId, positionId, ...newEmployeeData } = employeeData;

    const candidate = await this.candidatesService.readCandidate(candidateId);

    const position = await this.jobTitlesService.readJobTitle(positionId);

    const newEmployee = await this.employeesRepository.create({
      ...newEmployeeData,
      candidate,
      position,
    });

    const employee = await this.employeesRepository.save(newEmployee);

    return this.readEmployee(employee.id);
  }

  async readEmployee(id: string): Promise<EmployeeDto> {
    const employee: EmployeeDto = await this.employeesRepository.findOne({
      where: { id },
      relations: ['candidate', 'position'],
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
    const { candidateId, positionId, ...updatedEmployeeData } = employeeData;

    const candidate = await this.candidatesService.readCandidate(candidateId);

    const position = await this.jobTitlesService.readJobTitle(positionId);

    const employee = await this.readEmployee(id);

    return await this.employeesRepository.save({
      ...employee,
      ...updatedEmployeeData,
      id,
      candidate,
      position,
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
      relations: ['candidate', 'position'],
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

  async readAllEmployees(filters?: {
    ids?: string[];
  }): Promise<Pick<EmployeeDto, 'id'>[]> {
    let filter = {};

    if (filters?.ids?.length > 0) {
      filter = {
        ...filter,
        id: In(filters.ids),
      };
    }

    return await this.employeesRepository.find({
      where: filter,
      select: ['id'],
      order: { createdAt: 'asc' },
    });
  }
}
