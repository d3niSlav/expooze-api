import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Question } from './question.entity';
import { TopicDto } from '../topic/topic.dto';

export class QuestionDto implements Question {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly text: string;

  @IsOptional()
  @IsArray()
  readonly topics?: TopicDto[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsOptional()
  @IsArray()
  readonly topicIds?: string[];
}

export class EditQuestionDto extends CreateQuestionDto {
  @IsOptional()
  readonly id?: string;
}
