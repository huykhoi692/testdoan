import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBookProgress } from '../model/book-progress.model';
import { IChapterProgress } from '../model/chapter-progress.model';

const bookProgressUrl = '/api/book-progresses';
const chapterProgressUrl = '/api/chapter-progresses';

// Book Progress APIs
export const getBookProgress = createAsyncThunk('progress/fetch_book', async (bookId: number) => {
  const response = await axios.get<IBookProgress>(`${bookProgressUrl}/book/${bookId}`);
  return response.data;
});

export const updateBookProgress = createAsyncThunk(
  'progress/update_book_progress',
  async ({ bookId, percent }: { bookId: number; percent: number }) => {
    const response = await axios.put<IBookProgress>(`${bookProgressUrl}/book/${bookId}`, { percent });
    return response.data;
  },
);

export const getUserBookProgresses = createAsyncThunk('progress/fetch_user_books', async () => {
  const response = await axios.get<IBookProgress[]>(`${bookProgressUrl}/my-books`);
  return response.data;
});

// Chapter Progress APIs
export const getChapterProgress = createAsyncThunk('progress/fetch_chapter', async (chapterId: number) => {
  const response = await axios.get<IChapterProgress>(`${chapterProgressUrl}/chapter/${chapterId}`);
  return response.data;
});

export const updateChapterProgress = createAsyncThunk('progress/update_chapter_progress', async (progress: Partial<IChapterProgress>) => {
  const response = await axios.put<IChapterProgress>(`${chapterProgressUrl}/chapter/${progress.chapterId}`, progress);
  return response.data;
});

export const markChapterComplete = createAsyncThunk('progress/mark_chapter_complete', async (chapterId: number) => {
  const response = await axios.post<void>(`${chapterProgressUrl}/chapter/${chapterId}/complete`);
  return { chapterId };
});

export const getChapterProgressesByBook = createAsyncThunk('progress/fetch_chapters_by_book', async (bookId: number) => {
  const response = await axios.get<IChapterProgress[]>(`${chapterProgressUrl}/book/${bookId}/chapters`);
  return response.data;
});

// Learning History
export const getLearningHistory = createAsyncThunk('progress/fetch_learning_history', async () => {
  const response = await axios.get('/api/learning-reports/history');
  return response.data;
});
