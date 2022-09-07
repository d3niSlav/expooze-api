import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { JobTitle } from './job-title.entity';
import { PositionDto } from '../position/position.dto';

export class JobTitleDto implements JobTitle {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsOptional()
  readonly positions?: PositionDto[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateJobTitleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  readonly shortTitle: string;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  minSalary?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  averageSalary?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  maxSalary?: number;
}

export class EditJobTitleDto extends CreateJobTitleDto {
  @ApiProperty()
  @IsUUID('all')
  @IsNotEmpty()
  readonly id: string;
}
