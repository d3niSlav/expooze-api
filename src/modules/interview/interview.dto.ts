import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CandidateDto } from '../candidate/candidate.dto';
import { Interview } from './interview.entity';
import { PositionDto } from '../position/position.dto';
import { ProgrammingLanguageDto } from '../programmingLanguage/programming-language.dto';
import { TagDto } from '../tag/tag.dto';

export class InterviewDto implements Interview {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly interviewDate?: string;

  @IsNotEmpty()
  readonly position: PositionDto;

  @IsOptional()
  readonly candidates?: CandidateDto[];

  @IsOptional()
  readonly tags?: TagDto[];

  @IsNotEmpty()
  readonly programmingLanguage: ProgrammingLanguageDto;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly programmingLanguageId?: string;

  @IsString()
  @IsOptional()
  readonly interviewDate?: string;

  @IsString()
  @IsOptional()
  readonly positionId?: string;

  @IsArray()
  @IsOptional()
  readonly candidatesIds?: string[];

  @IsArray()
  @IsOptional()
  readonly tagIds?: string[];
}

export class UpdateInterviewDto extends CreateInterviewDto {
  @IsOptional()
  readonly id?: string;
}
