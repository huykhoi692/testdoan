import appUser from 'app/entities/app-user/app-user.reducer';
import book from 'app/entities/book/book.reducer';
import chapter from 'app/entities/chapter/chapter.reducer';
import word from 'app/entities/word/word.reducer';
import wordExample from 'app/entities/word-example/word-example.reducer';
import userVocabulary from 'app/entities/user-vocabulary/user-vocabulary.reducer';
import userGrammar from 'app/entities/user-grammar/user-grammar.reducer';
import grammar from 'app/entities/grammar/grammar.reducer';
import grammarExample from 'app/entities/grammar-example/grammar-example.reducer';
import bookReview from 'app/entities/book-review/book-review.reducer';
import listeningExercise from 'app/entities/listening-exercise/listening-exercise.reducer';
import speakingExercise from 'app/entities/speaking-exercise/speaking-exercise.reducer';
import readingExercise from 'app/entities/reading-exercise/reading-exercise.reducer';
import writingExercise from 'app/entities/writing-exercise/writing-exercise.reducer';
import listeningOption from 'app/entities/listening-option/listening-option.reducer';
import readingOption from 'app/entities/reading-option/reading-option.reducer';
import comment from 'app/entities/comment/comment.reducer';
import exerciseResult from 'app/entities/exercise-result/exercise-result.reducer';
import chapterProgress from 'app/entities/chapter-progress/chapter-progress.reducer';
import bookProgress from 'app/entities/book-progress/book-progress.reducer';
import achievement from 'app/entities/achievement/achievement.reducer';
import userAchievement from 'app/entities/user-achievement/user-achievement.reducer';
import learningStreak from 'app/entities/learning-streak/learning-streak.reducer';
import studySession from 'app/entities/study-session/study-session.reducer';
import streakIcon from 'app/entities/streak-icon/streak-icon.reducer';
import streakMilestone from 'app/entities/streak-milestone/streak-milestone.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  appUser,
  book,
  chapter,
  word,
  wordExample,
  userVocabulary,
  userGrammar,
  grammar,
  grammarExample,
  bookReview,
  listeningExercise,
  speakingExercise,
  readingExercise,
  writingExercise,
  listeningOption,
  readingOption,
  comment,
  exerciseResult,
  chapterProgress,
  bookProgress,
  achievement,
  userAchievement,
  learningStreak,
  studySession,
  streakIcon,
  streakMilestone,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
