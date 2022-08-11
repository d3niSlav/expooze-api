import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Subject } from './subject.entity';
import { TagDto } from '../tag/tag.dto';
import { TopicDto } from '../topic/topic.dto';

export class SubjectDto implements Subject {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly order?: number;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;

  @IsArray()
  readonly topics: TopicDto[];

  @IsOptional()
  @IsArray()
  readonly tags?: TagDto[];
}

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly order?: number;

  @IsArray()
  @IsOptional()
  readonly topicIds?: string[];

  @IsOptional()
  @IsArray()
  readonly tagIds?: string[];
}

export class UpdateSubjectDto extends CreateSubjectDto {
  @IsOptional()
  readonly id?: string;
}
