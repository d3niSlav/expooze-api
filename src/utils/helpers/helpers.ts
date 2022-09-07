import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_SORT_BY,
} from '../constants';
import { OrderDirection, SortOrderDto } from '../types';
import { getConnection, ObjectType, Repository } from 'typeorm';

export const getTotalPages = (
  totalItems: number,
  itemsPerPage = DEFAULT_PAGE_LIMIT,
): number => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return totalPages > 0 ? totalPages : 1;
};

export const prepareSortOrder = <T>(
  sortOrder: SortOrderDto,
  repository: Repository<T>,
  defaultSortBy = DEFAULT_SORT_BY,
): SortOrderDto => {
  const userEntityProps = Object.keys(repository.metadata.propertiesMap);
  const { order, sortBy } = sortOrder;
  const orderDirection = order.toUpperCase() as OrderDirection;

  sortOrder.order = Object.values(OrderDirection).includes(orderDirection)
    ? orderDirection
    : DEFAULT_ORDER;
  sortOrder.sortBy = userEntityProps.includes(sortBy) ? sortBy : defaultSortBy;

  return sortOrder;
};
