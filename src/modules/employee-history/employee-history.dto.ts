import { IsNotEmpty, IsOptional } from 'class-validator';

import { EmployeeHistory } from './employee-history.entity';
import { Employee } from '../employee/employee.entity';

export class EmployeeHistoryDto implements EmployeeHistory {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly employee: Employee;

  @IsOptional()
  readonly oldPosition?: string;

  @IsOptional()
  readonly newPosition?: string;

  @IsOptional()
  readonly oldSalary?: number;

  @IsOptional()
  readonly newSalary?: number;

  @IsOptional()
  readonly updatedAt: string;
}

export class SaveEmployeeHistoryDto {
  @IsOptional()
  readonly oldPosition?: string;

  @IsOptional()
  readonly newPosition?: string;

  @IsOptional()
  readonly oldSalary?: number;

  @IsOptional()
  readonly newSalary?: number;
}
