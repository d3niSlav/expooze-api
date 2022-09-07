import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT } from '../constants';

export const transformPage = ({ value: page }): number => {
  page = Number(page);
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  return page;
};

export const transformLimit = ({ value: limit }): number => {
  limit = Number(limit);
  if (isNaN(limit) || limit <= 0 || limit > MAX_PAGE_LIMIT) {
    limit = DEFAULT_PAGE_LIMIT;
  }

  return limit;
};
