import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { loadingBarMiddleware } from 'react-redux-loading-bar';

import authentication from '../shared/auth/auth.reducer';
import studySession from '../shared/reducers/study-session.reducer';
import lesson from '../shared/reducers/lesson.reducer';
import chapter from '../shared/reducers/chapter.reducer';
import book from '../shared/reducers/book.reducer';

const store = configureStore({
  reducer: {
    authentication,
    studySession,
    lesson,
    chapter,
    book,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['authentication/login/fulfilled'],
      },
    }).concat(loadingBarMiddleware()),
});

// Types
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
