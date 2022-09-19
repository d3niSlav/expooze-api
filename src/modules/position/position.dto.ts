import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Position } from './position.entity';
import { JobTitleDto } from '../job-title/job-title.dto';
import { InterviewDto } from '../interview/interview.dto';

export class PositionDto implements Position {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  readonly jobTitle: JobTitleDto;

  @IsArray()
  @IsOptional()
  readonly interviews?: InterviewDto[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly jobTitleId: string;

  @IsOptional()
  readonly description?: string;
}

export class UpdatePositionDto extends CreatePositionDto {
  @IsOptional()
  readonly id?: string;
}
