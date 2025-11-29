import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IChapter } from '../model/models';

export type { IChapter };

export const getChapters = createAsyncThunk('chapter/fetch_all', async () => {
  const response = await axios.get<IChapter[]>('api/chapters');
  return response.data;
});

export const getChaptersByBookId = createAsyncThunk('chapter/fetch_by_book', async (bookId: number) => {
  const response = await axios.get<IChapter[]>(`api/chapters/book/${bookId}`);
  return response.data;
});

export const getChapter = createAsyncThunk('chapter/fetch_entity', async (id: number) => {
  const response = await axios.get<IChapter>(`api/chapters/${id}`);
  return response.data;
});

export const createChapter = createAsyncThunk('chapter/create_entity', async (entity: IChapter) => {
  const response = await axios.post<IChapter>('api/chapters', entity);
  return response.data;
});

export const updateChapter = createAsyncThunk('chapter/update_entity', async (entity: IChapter) => {
  const response = await axios.put<IChapter>(`api/chapters/${entity.id}`, entity);
  return response.data;
});

export const deleteChapter = createAsyncThunk('chapter/delete_entity', async (id: number) => {
  await axios.delete(`api/chapters/${id}`);
  return { id };
});
