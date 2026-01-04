import { createSlice } from '@reduxjs/toolkit';
import { IWord } from 'app/shared/model/models';
import { getWordsByChapter, getWord, createWord, updateWord, deleteWord } from 'app/shared/services/word.service';

const initialState = {
  loading: false,
  errorMessage: null as string | null,
  entities: [] as ReadonlyArray<IWord>,
  entity: null as IWord | null,
  updating: false,
  updateSuccess: false,
};

export type WordState = Readonly<typeof initialState>;

export const WordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWordsByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getWordsByChapter.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to fetch words';
      })
      .addCase(getWordsByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getWord.pending, state => {
        state.loading = true;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(createWord.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(createWord.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = action.payload;
      })
      .addCase(updateWord.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = action.payload;
      })
      .addCase(deleteWord.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = null;
      });
  },
});

export const { reset } = WordSlice.actions;

export default WordSlice.reducer;
