import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBook } from '../model/models';

export type { IBook };

// Plain async function for direct usage (e.g., in dashboard)
export const getBooksApi = async (page = 0, size = 20): Promise<any> => {
  const response = await axios.get<any>('/api/books', {
    params: { page, size },
  });
  return response.data;
};

export const getBooks = createAsyncThunk('book/fetch_all', async ({ page = 0, size = 20 }: { page?: number; size?: number } = {}) => {
  const response = await axios.get<any>('/api/books', {
    params: { page, size },
  });
  return response.data;
});

export const getBook = createAsyncThunk('book/fetch_entity', async (id: number) => {
  const response = await axios.get<IBook>(`/api/books/${id}`);
  return response.data;
});

export const createBook = createAsyncThunk('book/create_entity', async (book: IBook) => {
  const response = await axios.post<IBook>('/api/books', book);
  return response.data;
});

export const updateBook = createAsyncThunk('book/update_entity', async ({ id, book }: { id: number; book: IBook }) => {
  const response = await axios.put<IBook>(`/api/books/${id}`, book);
  return response.data;
});

export const deleteBook = createAsyncThunk('book/delete_entity', async (id: number) => {
  await axios.delete(`/api/books/${id}`);
  return { id };
});
