import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Interview } from './interview.entity';

export class InterviewDto implements Interview {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;
}

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}

export class UpdateInterviewDto extends CreateInterviewDto {
  @IsOptional()
  readonly id?: string;
}
