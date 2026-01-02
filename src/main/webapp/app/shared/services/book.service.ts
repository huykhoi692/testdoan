import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBook } from '../model/models';
import { IPaginationBaseState } from 'app/shared/utils/reducer.utils';

const API_URL = '/api/books';

// Action to get all books with pagination
export const getEntities = createAsyncThunk('book/fetch_entity_list', async ({ page, size, sort }: IPaginationBaseState) => {
  const requestUrl = `${API_URL}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  const response = await axios.get<IBook[]>(requestUrl);
  // Return only serializable data
  return { data: response.data, totalCount: response.headers['x-total-count'] };
});

// Get a single book by ID
export const getEntity = createAsyncThunk('book/fetch_entity', async (id: string | number) => {
  const requestUrl = `${API_URL}/${id}`;
  const response = await axios.get<IBook>(requestUrl);
  return response.data;
});

// Create a new book
export const createEntity = createAsyncThunk('book/create_entity', async (entity: IBook, thunkAPI) => {
  const response = await axios.post<IBook>(API_URL, entity);
  thunkAPI.dispatch(getEntities({})); // Refetch list after creation
  return response.data;
});

// Update an existing book
export const updateEntity = createAsyncThunk('book/update_entity', async (entity: IBook, thunkAPI) => {
  const response = await axios.put<IBook>(`${API_URL}/${entity.id}`, entity);
  thunkAPI.dispatch(getEntities({})); // Refetch list after update
  return response.data;
});

// Partially update a book
export const partialUpdateEntity = createAsyncThunk('book/partial_update_entity', async (entity: IBook, thunkAPI) => {
  const response = await axios.patch<IBook>(`${API_URL}/${entity.id}`, entity);
  thunkAPI.dispatch(getEntities({})); // Refetch list after partial update
  return response.data;
});

// Delete a book
export const deleteEntity = createAsyncThunk('book/delete_entity', async (id: string | number, thunkAPI) => {
  const requestUrl = `${API_URL}/${id}`;
  const response = await axios.delete<IBook>(requestUrl);
  thunkAPI.dispatch(getEntities({})); // Refetch list after deletion
  return response.data;
});

// Alias functions for backward compatibility
export const getBooks = getEntities;
export const getBook = getEntity;
export const createBook = createEntity;
export const updateBook = updateEntity;
export const deleteBook = deleteEntity;

// Get chapters for a specific book
export const getBookChapters = createAsyncThunk('book/fetch_chapters', async (bookId: string | number) => {
  const requestUrl = `/api/books/${bookId}/chapters`;
  const response = await axios.get(requestUrl);
  return response.data;
});

// Process book with AI
export const processBookWithAI = createAsyncThunk('book/process_with_ai', async (bookId: string | number) => {
  const requestUrl = `/api/books/${bookId}/process-ai`;
  const response = await axios.post(requestUrl);
  return response.data;
});
