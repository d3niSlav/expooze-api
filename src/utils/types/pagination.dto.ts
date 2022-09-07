import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { DEFAULT_PAGE_LIMIT } from '../constants';
import { transformLimit, transformPage } from '../transformers';

export class PaginationParamsDto {
  @IsOptional()
  @Transform(
    (page) => {
      return transformPage(page);
    },
    { toClassOnly: true },
  )
  page?: number = 1;

  @IsOptional()
  @Transform(
    (limit) => {
      return transformLimit(limit);
    },
    { toClassOnly: true },
  )
  limit?: number = DEFAULT_PAGE_LIMIT;
}

export class PaginationDto extends PaginationParamsDto {
  totalPages: number;

  totalCount: number;
}
