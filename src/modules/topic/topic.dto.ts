import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Topic } from './topic.entity';
import { TagDto } from '../tag/tag.dto';
import { SubjectDto } from '../subject/subject.dto';
import { DifficultyLevel } from '../../utils/enums/difficulty-level.enum';

export class TopicDto implements Topic {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly subject: SubjectDto;

  @IsEnum(DifficultyLevel)
  readonly difficulty: DifficultyLevel;

  @IsOptional()
  @IsNumber()
  readonly order?: number;

  @IsOptional()
  @IsArray()
  readonly tags?: TagDto[];

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly subjectId: string;

  @IsOptional()
  @IsNumber()
  readonly order?: number;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  readonly difficulty?: DifficultyLevel;

  @IsArray()
  @IsOptional()
  readonly tagIds?: string[];
}

export class UpdateTopicDto extends CreateTopicDto {
  @IsOptional()
  readonly id?: string;
}
