import axios from 'axios';
import { IGrammar } from '../model/grammar.model';

export type { IGrammar };

const apiUrl = 'api/grammars';

export const getGrammars = async (page = 0, size = 20) => {
  const response = await axios.get<any>(apiUrl, { params: { page, size } });
  return response.data;
};

export const getGrammar = async (id: number) => {
  const response = await axios.get<IGrammar>(`${apiUrl}/${id}`);
  return response.data;
};

export const getGrammarsByLesson = async (lessonId: number) => {
  const response = await axios.get<IGrammar[]>(`api/lessons/${lessonId}/grammars`);
  return response.data;
};

export const createGrammar = async (g: IGrammar) => {
  const response = await axios.post<IGrammar>(apiUrl, g);
  return response.data;
};

export const updateGrammar = async (id: number, g: IGrammar) => {
  const response = await axios.put<IGrammar>(`${apiUrl}/${id}`, g);
  return response.data;
};

export const deleteGrammar = async (id: number) => {
  await axios.delete(`${apiUrl}/${id}`);
};
