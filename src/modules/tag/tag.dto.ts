import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Tag } from './tag.entity';

export class TagDto implements Tag {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}

export class EditTagDto extends CreateTagDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
