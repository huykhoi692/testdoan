import { createSlice } from '@reduxjs/toolkit';
import { IGrammar } from 'app/shared/model/models';
import { getGrammarsByChapter, getGrammar, createGrammar, updateGrammar, deleteGrammar } from 'app/shared/services/grammar.service';

const initialState = {
  loading: false,
  errorMessage: null as string | null,
  entities: [] as ReadonlyArray<IGrammar>,
  entity: null as IGrammar | null,
  updating: false,
  updateSuccess: false,
};

export type GrammarState = Readonly<typeof initialState>;

export const GrammarSlice = createSlice({
  name: 'grammar',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getGrammarsByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getGrammarsByChapter.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to fetch grammars';
      })
      .addCase(getGrammarsByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getGrammar.pending, state => {
        state.loading = true;
      })
      .addCase(getGrammar.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(createGrammar.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(createGrammar.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = action.payload;
      })
      .addCase(updateGrammar.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(updateGrammar.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = action.payload;
      })
      .addCase(deleteGrammar.pending, state => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addCase(deleteGrammar.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = null;
      });
  },
});

export const { reset } = GrammarSlice.actions;

export default GrammarSlice.reducer;
