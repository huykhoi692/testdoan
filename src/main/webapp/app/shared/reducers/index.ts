import { combineReducers } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import applicationProfile from './application-profile';
import localeReducer from './locale.reducer';
import themeReducer from './theme.reducer';
import bookReducer from './book.reducer';
import chapterReducer from './chapter.reducer';
import progressReducer from './progress.reducer';
import notificationReducer from './notification.reducer';
import entitiesReducers from 'app/entities/reducers';

const rootReducer = combineReducers({
  authentication,
  applicationProfile,
  locale: localeReducer,
  theme: themeReducer,
  book: bookReducer,
  chapter: chapterReducer,
  progress: progressReducer,
  notification: notificationReducer,
  loadingBar,
  // Entity reducers
  ...entitiesReducers,
});

export default rootReducer;
