import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getBookProgress,
  updateBookProgress,
  getMyBooks,
  getChapterProgress,
  updateChapterProgress,
  getChapterProgressesByBook,
  enrollBook,
  markChapterAsCompleted,
} from '../services/progress.service';
import { IBookProgress, IChapterProgress } from '../model';

export interface ProgressState {
  loading: boolean;
  errorMessage: string | null;
  bookProgress: IBookProgress | null;
  chapterProgress: IChapterProgress | null;
  userBooks: IBookProgress[];
  chapterProgresses: IChapterProgress[];
}

const initialState: ProgressState = {
  loading: false,
  errorMessage: null,
  bookProgress: null,
  chapterProgress: null,
  userBooks: [],
  chapterProgresses: [],
};

export const ProgressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder
      // Book Progress
      .addCase(getBookProgress.pending, state => {
        state.loading = true;
      })
      .addCase(getBookProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.bookProgress = action.payload;
      })
      .addCase(getBookProgress.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to fetch book progress';
      })
      .addCase(updateBookProgress.fulfilled, (state, action: PayloadAction<IBookProgress>) => {
        state.bookProgress = action.payload;
      })
      .addCase(getMyBooks.fulfilled, (state, action: PayloadAction<IBookProgress[]>) => {
        state.userBooks = action.payload;
      })
      // Chapter Progress
      .addCase(getChapterProgress.fulfilled, (state, action) => {
        state.chapterProgress = action.payload;
      })
      .addCase(updateChapterProgress.fulfilled, (state, action: PayloadAction<IChapterProgress>) => {
        state.chapterProgress = action.payload;
        // Update in list if exists
        const index = state.chapterProgresses.findIndex(cp => cp.id === action.payload.id);
        if (index !== -1) {
          state.chapterProgresses[index] = action.payload;
        }
      })
      .addCase(getChapterProgressesByBook.fulfilled, (state, action) => {
        state.chapterProgresses = action.payload;
      })
      // Enroll Book
      .addCase(enrollBook.pending, state => {
        state.loading = true;
      })
      .addCase(enrollBook.fulfilled, (state, action) => {
        state.loading = false;
        state.bookProgress = action.payload;
      })
      .addCase(enrollBook.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Failed to enroll in book';
      })
      // Mark Chapter Completed
      .addCase(markChapterAsCompleted.fulfilled, (state, action) => {
        // Update in list if exists
        const index = state.chapterProgresses.findIndex(cp => cp.chapterId === action.payload.chapterId || cp.id === action.payload.id);
        if (index !== -1) {
          state.chapterProgresses[index] = {
            ...state.chapterProgresses[index],
            isCompleted: true,
            completed: true,
            progress: 100,
            percent: 100,
            // completedDate: action.payload.completedDate, // Removed as it might not be in payload
          };
        } else {
          // If payload is IChapterProgress, push it
          // state.chapterProgresses.push(action.payload);
        }
      });
  },
});

export const { reset } = ProgressSlice.actions;
export default ProgressSlice.reducer;
