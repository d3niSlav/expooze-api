import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Question } from './question.entity';

export class QuestionDto implements Question {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateQuestionDto extends CreateQuestionDto {
  @IsOptional()
  readonly id?: string;
}
