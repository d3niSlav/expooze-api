import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
