import { ASC } from './pagination.constants';

export interface IPaginationState {
  activePage: number;
  itemsPerPage: number;
  sort: string;
  order: string;
}

/**
 * Build a pagination state from location (expects an object with `search` string),
 * a default itemsPerPage and a default sort field.
 */
export const getPaginationState = (
  location: { search?: string } = { search: '' },
  itemsPerPage = 20,
  defaultSort = 'id',
): IPaginationState => {
  const params = new URLSearchParams(location.search || '');
  const page = params.get('page');
  const sortParam = params.get('sort');
  if (sortParam) {
    const sortSplit = sortParam.split(',');
    return {
      activePage: page ? +page : 1,
      itemsPerPage,
      sort: sortSplit[0],
      order: sortSplit[1] || ASC,
    };
  }
  return {
    activePage: page ? +page : 1,
    itemsPerPage,
    sort: defaultSort,
    order: ASC,
  };
};

/**
 * Override an existing pagination state with query params from a search string.
 */
export const overridePaginationStateWithQueryParams = (paginationState: IPaginationState, search = ''): IPaginationState => {
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const sort = params.get('sort');
  if (page && sort) {
    const sortSplit = sort.split(',');
    return {
      ...paginationState,
      activePage: +page,
      sort: sortSplit[0],
      order: sortSplit[1] || ASC,
    };
  }
  return paginationState;
};

export const cleanEntity = (entity: any) => {
  if (!entity || typeof entity !== 'object') return entity;
  const obj: any = {};
  Object.entries(entity).forEach(([key, value]) => {
    if (value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0)) {
      obj[key] = value;
    }
  });
  return obj;
};
