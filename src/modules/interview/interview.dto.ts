import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Interview } from './interview.entity';
import { PositionDto } from '../position/position.dto';
import { ProgrammingLanguageDto } from '../programmingLanguage/programming-language.dto';

export class InterviewDto implements Interview {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly position: PositionDto;

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
  readonly programmingLanguageId: string;
}

export class UpdateInterviewDto extends CreateInterviewDto {
  @IsOptional()
  readonly id?: string;
}
