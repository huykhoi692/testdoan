import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILesson } from '../model/models';

export type { ILesson };

export const getLessons = createAsyncThunk('lesson/fetch_all', async () => {
  const response = await axios.get<ILesson[]>('api/lessons');
  return response.data;
});

export const getLessonsByChapterId = createAsyncThunk('lesson/fetch_by_chapter', async (chapterId: number) => {
  const response = await axios.get<ILesson[]>(`api/lessons/chapter/${chapterId}`);
  return response.data;
});

export const getLesson = createAsyncThunk('lesson/fetch_entity', async (id: number) => {
  const response = await axios.get<ILesson>(`api/lessons/${id}`);
  return response.data;
});

export const createLesson = createAsyncThunk('lesson/create_entity', async (entity: ILesson) => {
  const response = await axios.post<ILesson>('api/lessons', entity);
  return response.data;
});

export const updateLesson = createAsyncThunk('lesson/update_entity', async (entity: ILesson) => {
  const response = await axios.put<ILesson>(`api/lessons/${entity.id}`, entity);
  return response.data;
});

export const deleteLesson = createAsyncThunk('lesson/delete_entity', async (id: number) => {
  await axios.delete(`api/lessons/${id}`);
  return { id };
});
