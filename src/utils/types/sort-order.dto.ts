import { IsOptional } from 'class-validator';

import { DEFAULT_SORT_BY } from '../constants';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortOrderDto {
  @IsOptional()
  order?: OrderDirection = OrderDirection.DESC;

  @IsOptional()
  sortBy?: string = DEFAULT_SORT_BY;
}
