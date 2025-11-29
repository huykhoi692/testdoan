import axios from 'axios';
import { IWord, IWordExample } from '../model/models';

export type { IWord, IWordExample };

const apiUrl = 'api/words';

// Simple API calls - no Redux thunks needed for basic CRUD
// Backend handles all business logic

export const getWords = async (page = 0, size = 20) => {
  const response = await axios.get<any>(apiUrl, {
    params: { page, size },
  });
  return response.data;
};

export const getWord = async (id: number) => {
  const response = await axios.get<IWord>(`${apiUrl}/${id}`);
  return response.data;
};

export const getWordsByLesson = async (lessonId: number) => {
  const response = await axios.get<IWord[]>(`api/lessons/${lessonId}/words`);
  return response.data;
};

export const createWord = async (word: IWord) => {
  const response = await axios.post<IWord>(apiUrl, word);
  return response.data;
};

export const updateWord = async (id: number, word: IWord) => {
  const response = await axios.put<IWord>(`${apiUrl}/${id}`, word);
  return response.data;
};

export const deleteWord = async (id: number) => {
  await axios.delete(`${apiUrl}/${id}`);
};
