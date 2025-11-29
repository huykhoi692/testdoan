import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserProgress } from '../model/models';

export type { IUserProgress };

export interface IDashboardStats {
  wordsLearned: number;
  quizzesCompleted: number;
  courseProgress: number;
  languagesStudying: number;
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  longestStreak: number;
}

export const getUserProgress = async (): Promise<IUserProgress[]> => {
  const response = await axios.get<IUserProgress[]>('api/user-progresses/my');
  return response.data;
};

export const getDashboardStats = async (): Promise<IDashboardStats> => {
  const response = await axios.get<IDashboardStats>('api/dashboard/stats');
  return response.data;
};

export const getWeeklyProgress = async (): Promise<any[]> => {
  const response = await axios.get<any[]>('api/dashboard/weekly-progress');
  return response.data;
};

export const getAllUserProgress = createAsyncThunk('userProgress/fetch_all', async () => {
  const response = await axios.get<IUserProgress[]>('api/user-progresses/my');
  return response.data;
});

export const updateUserProgress = createAsyncThunk('userProgress/update', async (progress: IUserProgress) => {
  const response = await axios.put<IUserProgress>(`api/user-progresses/${progress.id}`, progress);
  return response.data;
});

export const createUserProgress = createAsyncThunk('userProgress/create', async (progress: IUserProgress) => {
  const response = await axios.post<IUserProgress>('api/user-progresses', progress);
  return response.data;
});
