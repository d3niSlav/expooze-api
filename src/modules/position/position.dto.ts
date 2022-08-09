import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Position } from './position.entity';

export class PositionDto implements Position {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdatePositionDto extends CreatePositionDto {
  @IsOptional()
  readonly id?: string;
}
