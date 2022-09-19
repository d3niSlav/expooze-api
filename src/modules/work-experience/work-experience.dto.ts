import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { WorkExperience } from './work-experience.entity';
import { Candidate } from '../candidate/candidate.entity';
import { TagDto } from '../tag/tag.dto';

export class WorkExperienceDto implements WorkExperience {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly jobTitle: string;

  @IsNotEmpty()
  readonly seniorityLevel: string;

  @IsString()
  @IsOptional()
  readonly years?: string;

  @IsArray()
  @IsOptional()
  readonly skills?: TagDto[];

  @IsNotEmpty()
  readonly candidate: Candidate;

  @IsArray()
  @IsOptional()
  readonly fields?: string[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateWorkExperienceDto {
  @ApiProperty()
  @IsString()
  readonly jobTitle: string;

  @ApiProperty()
  @IsString()
  readonly seniorityLevel: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly years?: string;

  @IsArray()
  @IsOptional()
  readonly skillIds?: string[];

  @IsArray()
  @IsOptional()
  readonly fields?: string[];
}

export class EditWorkExperienceDto extends CreateWorkExperienceDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
