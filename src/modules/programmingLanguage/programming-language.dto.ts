import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ProgrammingLanguage } from './programming-language.entity';
import { InterviewDto } from "../interview/interview.dto";

export class ProgrammingLanguageDto implements ProgrammingLanguage {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @IsArray()
  readonly interviews?: InterviewDto[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateProgrammingLanguageDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateProgrammingLanguageDto extends CreateProgrammingLanguageDto {
  @IsOptional()
  readonly id?: string;
}
