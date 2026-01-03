import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserChapter } from 'app/shared/model/user-chapter.model';
import { serializeAxiosError } from 'app/shared/utils/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserChapter>,
  entity: {} as IUserChapter,
  updating: false,
  updateSuccess: false,
};

export type UserChapterState = Readonly<typeof initialState>;

// Actions

export const getMyChapters = createAsyncThunk('userChapter/fetch_entity_list', async () => {
  const requestUrl = 'api/user/saved-chapters';
  const res = await axios.get<IUserChapter[]>(requestUrl);
  return res.data;
});

export const enrollChapter = createAsyncThunk(
  'userChapter/enroll_chapter',
  async (chapterId: number, thunkAPI) => {
    const requestUrl = `api/user/saved-chapters/enroll/${chapterId}`;
    const res = await axios.post<IUserChapter>(requestUrl);
    return res.data;
  },
  { serializeError: serializeAxiosError },
);

// Slice

export const UserChapterSlice = createSlice({
  name: 'userChapter',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyChapters.pending, state => {
        state.loading = true;
      })
      .addCase(getMyChapters.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getMyChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(enrollChapter.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(enrollChapter.rejected, (state, action) => {
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(enrollChapter.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        // Add or update the enrolled chapter in the list
        const existingIndex = state.entities.findIndex(item => item.id === action.payload.id);
        if (existingIndex > -1) {
          const updatedEntities = [...state.entities];
          updatedEntities[existingIndex] = action.payload;
          state.entities = updatedEntities;
        } else {
          state.entities = [...state.entities, action.payload];
        }
      });
  },
});

export const { reset } = UserChapterSlice.actions;

export default UserChapterSlice.reducer;
