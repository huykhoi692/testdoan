/**
 * Utility functions for entity operations
 */

export interface IPaginationState {
  page: number;
  size: number;
  sort: string;
}

/**
 * Override pagination state with query params from URL
 * @param paginationBaseState - Base pagination state
 * @returns Updated pagination state
 */
export const overridePaginationStateWithQueryParams = (paginationBaseState: IPaginationState): IPaginationState => {
  // Try to get params from URL
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const size = urlParams.get('size');
    const sort = urlParams.get('sort');

    return {
      page: page ? parseInt(page, 10) : paginationBaseState.page,
      size: size ? parseInt(size, 10) : paginationBaseState.size,
      sort: sort || paginationBaseState.sort,
    };
  }

  return paginationBaseState;
};

/**
 * Get sort state from URL params
 */
export const getSortState = (location: any, itemsPerPage: number, sortField = 'id', sortOrder = 'asc') => {
  const pageParam = new URLSearchParams(location.search).get('page');
  const sortParam = new URLSearchParams(location.search).get('sort');

  let sort = `${sortField},${sortOrder}`;
  if (sortParam) {
    sort = sortParam;
  }

  return {
    page: pageParam ? parseInt(pageParam, 10) : 1,
    size: itemsPerPage,
    sort,
  };
};
