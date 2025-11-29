import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AppUser from './app-user';
import Book from './book';
import Chapter from './chapter';
import Word from './word';
import WordExample from './word-example';
import UserVocabulary from './user-vocabulary';
import UserGrammar from './user-grammar';
import Grammar from './grammar';
import GrammarExample from './grammar-example';
import BookReview from './book-review';
import ListeningExercise from './listening-exercise';
import SpeakingExercise from './speaking-exercise';
import ReadingExercise from './reading-exercise';
import WritingExercise from './writing-exercise';
import ListeningOption from './listening-option';
import ReadingOption from './reading-option';
import Comment from './comment';
import ExerciseResult from './exercise-result';
import ChapterProgress from './chapter-progress';
import BookProgress from './book-progress';
import Achievement from './achievement';
import UserAchievement from './user-achievement';
import LearningStreak from './learning-streak';
import StudySession from './study-session';
import StreakIcon from './streak-icon';
import StreakMilestone from './streak-milestone';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="app-user/*" element={<AppUser />} />
        <Route path="book/*" element={<Book />} />
        <Route path="chapter/*" element={<Chapter />} />
        <Route path="word/*" element={<Word />} />
        <Route path="word-example/*" element={<WordExample />} />
        <Route path="user-vocabulary/*" element={<UserVocabulary />} />
        <Route path="user-grammar/*" element={<UserGrammar />} />
        <Route path="grammar/*" element={<Grammar />} />
        <Route path="grammar-example/*" element={<GrammarExample />} />
        <Route path="book-review/*" element={<BookReview />} />
        <Route path="listening-exercise/*" element={<ListeningExercise />} />
        <Route path="speaking-exercise/*" element={<SpeakingExercise />} />
        <Route path="reading-exercise/*" element={<ReadingExercise />} />
        <Route path="writing-exercise/*" element={<WritingExercise />} />
        <Route path="listening-option/*" element={<ListeningOption />} />
        <Route path="reading-option/*" element={<ReadingOption />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="exercise-result/*" element={<ExerciseResult />} />
        <Route path="chapter-progress/*" element={<ChapterProgress />} />
        <Route path="book-progress/*" element={<BookProgress />} />
        <Route path="achievement/*" element={<Achievement />} />
        <Route path="user-achievement/*" element={<UserAchievement />} />
        <Route path="learning-streak/*" element={<LearningStreak />} />
        <Route path="study-session/*" element={<StudySession />} />
        <Route path="streak-icon/*" element={<StreakIcon />} />
        <Route path="streak-milestone/*" element={<StreakMilestone />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
