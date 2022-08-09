import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { Subject } from './subject.entity';

export class SubjectDto implements Subject {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly order?: number;
}

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly order?: number;
}

export class UpdateSubjectDto extends CreateSubjectDto {
  @IsOptional()
  readonly id?: string;
}
