import { AnyAction, createSlice, SliceCaseReducers, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type IQueryParams = { query?: string; page?: number; size?: number; sort?: string };

export interface EntityState<T> {
  loading: boolean;
  errorMessage: string | null;
  entities: ReadonlyArray<T>;
  entity: T;
  updating: boolean;
  totalItems: number;
  updateSuccess: boolean;
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

export const createEntitySlice = <T>(options: {
  name: string;
  initialState: T;
  reducers?: SliceCaseReducers<T>;
  extraReducers?: (builder: ActionReducerMapBuilder<T>) => void;
}) => {
  return createSlice({
    name: options.name,
    initialState: options.initialState,
    reducers: {
      reset: () => options.initialState,
      ...(options.reducers || {}),
    },
    extraReducers: options.extraReducers,
  });
};

export const isFulfilledAction = (action: AnyAction) => action.type.endsWith('/fulfilled');
export const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending');
export const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected');
