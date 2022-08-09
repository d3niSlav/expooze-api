import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Topic } from './topic.entity';

export class TopicDto implements Topic {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateTopicDto extends CreateTopicDto {
  @IsOptional()
  readonly id?: string;
}
