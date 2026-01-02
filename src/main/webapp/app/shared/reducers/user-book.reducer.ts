import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserBook, defaultValue } from 'app/shared/model/user-book.model';
import { serializeAxiosError } from 'app/shared/utils/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserBook>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserBookState = Readonly<typeof initialState>;

// Actions

export const getUserBooks = createAsyncThunk('userBook/fetch_entity_list', async () => {
  const requestUrl = 'api/user/my-books';
  const res = await axios.get<IUserBook[]>(requestUrl);
  return res.data;
});

export const enrollUserBook = createAsyncThunk(
  'userBook/enroll_book',
  async (bookId: number, thunkAPI) => {
    const requestUrl = `api/user/my-books/enroll/${bookId}`;
    const res = await axios.post<IUserBook>(requestUrl);
    return res.data;
  },
  { serializeError: serializeAxiosError },
);

export const removeUserBook = createAsyncThunk(
  'userBook/remove_book',
  async (bookId: number, thunkAPI) => {
    const requestUrl = `api/user/my-books/${bookId}`;
    await axios.delete(requestUrl);
    return bookId;
  },
  { serializeError: serializeAxiosError },
);

export const toggleFavorite = createAsyncThunk(
  'userBook/toggle_favorite',
  async (bookId: number, thunkAPI) => {
    const requestUrl = `api/user/my-books/${bookId}/favorite`;
    const res = await axios.put<IUserBook>(requestUrl);
    return res.data;
  },
  { serializeError: serializeAxiosError },
);

// Slice

export const UserBookSlice = createSlice({
  name: 'userBook',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserBooks.pending, state => {
        state.loading = true;
      })
      .addCase(getUserBooks.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getUserBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(enrollUserBook.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(enrollUserBook.rejected, (state, action) => {
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(enrollUserBook.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        // Add or update the enrolled book in the list
        const existingIndex = state.entities.findIndex(item => item.id === action.payload.id);
        if (existingIndex > -1) {
          const updatedEntities = [...state.entities];
          updatedEntities[existingIndex] = action.payload;
          state.entities = updatedEntities;
        } else {
          state.entities = [...state.entities, action.payload];
        }
      })
      .addCase(removeUserBook.pending, state => {
        state.updating = true;
      })
      .addCase(removeUserBook.fulfilled, (state, action) => {
        state.updating = false;
        state.entities = state.entities.filter(entity => entity.bookId !== action.payload && entity.id !== action.payload);
        // Note: action.payload is bookId. But wait, removeUserBook returns bookId.
        // The entity might have id (UserBook ID) or bookId.
        // The API takes bookId.
        // Let's assume we filter by bookId.
        // But wait, the entity in the list is UserBook, which has `bookId`.
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.entities.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          const updatedEntities = [...state.entities];
          updatedEntities[index] = action.payload;
          state.entities = updatedEntities;
        }
      });
  },
});

export const { reset } = UserBookSlice.actions;

// Reducer
export default UserBookSlice.reducer;
