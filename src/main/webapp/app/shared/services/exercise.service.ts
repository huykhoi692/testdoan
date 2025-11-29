import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IListeningExercise } from '../model/listening-exercise.model';
import { ISpeakingExercise } from '../model/speaking-exercise.model';
import { IReadingExercise } from '../model/reading-exercise.model';
import { IWritingExercise } from '../model/writing-exercise.model';
import { IExerciseResult } from '../model/exercise-result.model';

// Listening Exercise APIs
export const getListeningExercises = createAsyncThunk('exercise/fetch_listening', async (chapterId: number) => {
  // Fetch all (large size) and filter by chapter on client side as BE doesn't support filtering by chapter yet
  const response = await axios.get<IListeningExercise[]>(`/api/listening-exercises?size=1000`);
  return response.data.filter(ex => ex.chapter?.id === chapterId);
});

export const getListeningExercise = createAsyncThunk('exercise/fetch_listening_one', async (id: number) => {
  const response = await axios.get<IListeningExercise>(`/api/listening-exercises/${id}`);
  return response.data;
});

export const submitListeningAnswer = createAsyncThunk(
  'exercise/submit_listening',
  async (data: { exerciseId: number; answer: string; score: number }) => {
    const result: any = {
      exerciseType: 'LISTENING',
      score: data.score, // This should be calculated or passed
      userAnswer: data.answer,
      submittedAt: new Date().toISOString(),
      listeningExercise: { id: data.exerciseId },
    };
    const response = await axios.post<IExerciseResult>(`/api/exercise-results`, result);
    return response.data;
  },
);

// Speaking Exercise APIs
export const getSpeakingExercises = createAsyncThunk('exercise/fetch_speaking', async (chapterId: number) => {
  const response = await axios.get<ISpeakingExercise[]>(`/api/speaking-exercises?size=1000`);
  return response.data.filter(ex => ex.chapter?.id === chapterId);
});

export const getSpeakingExercise = createAsyncThunk('exercise/fetch_speaking_one', async (id: number) => {
  const response = await axios.get<ISpeakingExercise>(`/api/speaking-exercises/${id}`);
  return response.data;
});

export const submitSpeakingAnswer = createAsyncThunk(
  'exercise/submit_speaking',
  async (data: { exerciseId: number; audioBlob: Blob; score: number }) => {
    // Note: The BE ExerciseResult doesn't seem to support file upload directly in the same entity creation call easily without custom controller.
    // For now, we will just save the result metadata. Audio upload might need a separate endpoint if supported.
    // Assuming we just save the result for now.
    const result: any = {
      exerciseType: 'SPEAKING',
      score: data.score,
      userAnswer: 'Audio submitted', // Placeholder
      submittedAt: new Date().toISOString(),
      speakingExercise: { id: data.exerciseId },
    };
    const response = await axios.post<IExerciseResult>(`/api/exercise-results`, result);
    return response.data;
  },
);

// Reading Exercise APIs
export const getReadingExercises = createAsyncThunk('exercise/fetch_reading', async (chapterId: number) => {
  const response = await axios.get<IReadingExercise[]>(`/api/reading-exercises?size=1000`);
  return response.data.filter(ex => ex.chapter?.id === chapterId);
});

export const getReadingExercise = createAsyncThunk('exercise/fetch_reading_one', async (id: number) => {
  const response = await axios.get<IReadingExercise>(`/api/reading-exercises/${id}`);
  return response.data;
});

export const submitReadingAnswer = createAsyncThunk(
  'exercise/submit_reading',
  async (data: { exerciseId: number; answer: string; score: number }) => {
    const result: any = {
      exerciseType: 'READING',
      score: data.score,
      userAnswer: data.answer,
      submittedAt: new Date().toISOString(),
      readingExercise: { id: data.exerciseId },
    };
    const response = await axios.post<IExerciseResult>(`/api/exercise-results`, result);
    return response.data;
  },
);

// Writing Exercise APIs
export const getWritingExercises = createAsyncThunk('exercise/fetch_writing', async (chapterId: number) => {
  const response = await axios.get<IWritingExercise[]>(`/api/writing-exercises?size=1000`);
  return response.data.filter(ex => ex.chapter?.id === chapterId);
});

export const getWritingExercise = createAsyncThunk('exercise/fetch_writing_one', async (id: number) => {
  const response = await axios.get<IWritingExercise>(`/api/writing-exercises/${id}`);
  return response.data;
});

export const submitWritingAnswer = createAsyncThunk(
  'exercise/submit_writing',
  async (data: { exerciseId: number; answer: string; score: number }) => {
    const result: any = {
      exerciseType: 'WRITING',
      score: data.score,
      userAnswer: data.answer,
      submittedAt: new Date().toISOString(),
      writingExercise: { id: data.exerciseId },
    };
    const response = await axios.post<IExerciseResult>(`/api/exercise-results`, result);
    return response.data;
  },
);

// Get user's exercise results
export const getExerciseResults = createAsyncThunk('exercise/fetch_results', async () => {
  const response = await axios.get<IExerciseResult[]>(`/api/exercise-results?size=1000`);
  return response.data;
});
