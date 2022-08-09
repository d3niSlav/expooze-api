import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class JobTitleDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly shortTitle?: string;

  @IsNotEmpty()
  readonly description?: string;

  @IsNotEmpty()
  readonly minSalary?: number;

  @IsNotEmpty()
  readonly averageSalary?: number;

  @IsNotEmpty()
  readonly maxSalary?: number;
}

export class CreateJobTitleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly shortTitle?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly minSalary?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly averageSalary?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly maxSalary?: number;
}
