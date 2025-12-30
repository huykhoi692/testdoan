import { AxiosError } from 'axios';

export interface EntityState<T> {
  loading: boolean;
  errorMessage: string | null;
  entities: ReadonlyArray<T>;
  entity: T | Record<string, never>;
  links?: {
    next: number;
  };
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
}

export interface IPaginationBaseState {
  page?: number;
  size?: number;
  sort?: string;
}

export interface IQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  query?: string;
}

export const serializeAxiosError = (error: AxiosError): any => {
  return {
    message: error.message,
    name: error.name,
    code: error.code,
    status: error.response?.status,
    data: error.response?.data,
  };
};

// Utility function to create entity slice (not used but exported for compatibility)
export const createEntitySlice = (name: string) => {
  return name;
};
