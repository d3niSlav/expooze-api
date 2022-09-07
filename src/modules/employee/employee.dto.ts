import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { Employee } from './employee.entity';
import { CandidateDto } from '../candidate/candidate.dto';
import { JobTitleDto } from '../job-title/job-title.dto';
import { EmployeeHistoryDto } from '../employee-history/employee-history.dto';

export class EmployeeDto implements Employee {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly candidate: CandidateDto;

  @IsNotEmpty()
  readonly position: JobTitleDto;

  @IsOptional()
  readonly history?: EmployeeHistoryDto[];

  @IsNotEmpty()
  readonly salary: number;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class SaveEmployeeDto {
  @IsUUID('all')
  @IsNotEmpty()
  readonly positionId: string;

  @IsNotEmpty()
  readonly salary: number;
}

export class CreateEmployeeDto extends SaveEmployeeDto {
  @IsUUID('all')
  @IsNotEmpty()
  readonly candidateId: string;
}

export class UpdateEmployeeDto extends SaveEmployeeDto {
  @IsOptional()
  readonly id?: string;
}
