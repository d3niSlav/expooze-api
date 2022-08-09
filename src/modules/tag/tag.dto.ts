import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Tag } from './tag.entity';

export class TagDto implements Tag {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;
}

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateTagDto extends CreateTagDto {
  @IsOptional()
  readonly id?: string;
}
