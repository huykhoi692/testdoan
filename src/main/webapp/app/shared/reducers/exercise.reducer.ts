import { createSlice } from '@reduxjs/toolkit';
import {
  getListeningExercisesByChapter,
  getSpeakingExercisesByChapter,
  getReadingExercisesByChapter,
  getWritingExercisesByChapter,
  createListeningExercise,
  updateListeningExercise,
  deleteListeningExercise,
  createSpeakingExercise,
  updateSpeakingExercise,
  deleteSpeakingExercise,
  createReadingExercise,
  updateReadingExercise,
  deleteReadingExercise,
  createWritingExercise,
  updateWritingExercise,
  deleteWritingExercise,
} from 'app/shared/services/exercise.service';

const initialState = {
  loading: false,
  errorMessage: null as string | null,
  entities: [] as any[], // Can be any of the 4 types
  entity: null as any,
  updating: false,
  updateSuccess: false,
};

export type ExerciseState = Readonly<typeof initialState>;

export const ExerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      // Listening
      .addCase(getListeningExercisesByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getListeningExercisesByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(createListeningExercise.pending, state => {
        state.updating = true;
      })
      .addCase(createListeningExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(updateListeningExercise.pending, state => {
        state.updating = true;
      })
      .addCase(updateListeningExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(deleteListeningExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      // Speaking
      .addCase(getSpeakingExercisesByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getSpeakingExercisesByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(createSpeakingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(createSpeakingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(updateSpeakingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(updateSpeakingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(deleteSpeakingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      // Reading
      .addCase(getReadingExercisesByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getReadingExercisesByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(createReadingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(createReadingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(updateReadingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(updateReadingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(deleteReadingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      // Writing
      .addCase(getWritingExercisesByChapter.pending, state => {
        state.loading = true;
      })
      .addCase(getWritingExercisesByChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(createWritingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(createWritingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(updateWritingExercise.pending, state => {
        state.updating = true;
      })
      .addCase(updateWritingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(deleteWritingExercise.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      });
  },
});

export const { reset } = ExerciseSlice.actions;

export default ExerciseSlice.reducer;
