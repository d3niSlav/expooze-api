import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ProgrammingLanguage } from './programming-language.entity';

export class ProgrammingLanguageDto implements ProgrammingLanguage {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

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
