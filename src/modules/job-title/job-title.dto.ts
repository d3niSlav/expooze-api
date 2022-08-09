import { IsNotEmpty, IsString } from 'class-validator';

import { JobTitle } from './job-title.entity';

export class JobTitleDto implements JobTitle {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly createdAt: string;

  @IsNotEmpty()
  readonly updatedAt: string;
}

export class CreateJobTitleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
