// DTOs matching backend exactly - follow JHipster convention

// Book DTO - matches BookDTO.java
export interface IBook {
  id?: number;
  title: string;
  level?: string;
  description?: string;
  thumbnail?: string;
}

// Chapter DTO - matches ChapterDTO.java
export interface IChapter {
  id?: number;
  title: string;
  orderIndex: number;
  bookId: number;
  bookTitle?: string;
}

// Lesson DTO - matches LessonDTO.java
export interface ILesson {
  id?: number;
  title: string;
  description?: string;
  level: string;
  estimatedMinutes?: number;
  thumbnail?: string;
  chapterId: number;
  chapterTitle?: string;
}

// Word DTO - matches WordDTO.java
export interface IWord {
  id?: number;
  text: string;
  meaning?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  imageUrl?: string;
}

// WordExample DTO - matches WordExampleDTO.java
export interface IWordExample {
  id?: number;
  sentence: string;
  translation?: string;
  wordId?: number;
}

// StudySession DTO - matches StudySessionDTO.java
export interface IStudySession {
  id?: number;
  userId?: number;
  lessonId?: number;
  startTime?: string;
  endTime?: string;
  duration?: number;
  status?: string;
  progress?: number;
  score?: number;
}

// UserProgress DTO - matches UserProgressDTO.java
export interface IUserProgress {
  id?: number;
  userId?: number;
  lessonId?: number;
  progressPercentage?: number;
  currentScore?: number;
  isCompleted?: boolean;
  completedDate?: string;
}

// UserVocabulary DTO - matches UserVocabularyDTO.java
export interface IUserVocabulary {
  id?: number;
  userId?: number;
  wordId?: number;
  lessonId?: number;
  isFavorite?: boolean;
  masteryLevel?: number;
  lastReviewedDate?: string;
}

// LearningStreak DTO - matches LearningStreakDTO.java
export interface ILearningStreak {
  id?: number;
  userId?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastStudyDate?: string;
  totalStudyDays?: number;
}

// Achievement DTO - matches AchievementDTO.java
export interface IAchievement {
  id?: number;
  name: string;
  description?: string;
  iconUrl?: string;
  category?: string;
  requiredValue?: number;
}

// UserAchievement DTO - matches UserAchievementDTO.java
export interface IUserAchievement {
  id?: number;
  userId?: number;
  achievementId?: number;
  unlockedDate?: string;
}

// Comment DTO - matches CommentDTO.java
export interface IComment {
  id?: number;
  userId?: number;
  lessonId?: number;
  content: string;
  createdDate?: string;
  parentCommentId?: number;
}

// Exercise DTOs - match backend DTOs
export interface IListeningExercise {
  id?: number;
  lessonId?: number;
  audioUrl: string;
  question: string;
  correctAnswer: string;
  options?: string[];
  orderIndex?: number;
}

export interface ISpeakingExercise {
  id?: number;
  lessonId?: number;
  prompt: string;
  sampleAnswer?: string;
  orderIndex?: number;
}

export interface IReadingExercise {
  id?: number;
  lessonId?: number;
  passage: string;
  question: string;
  correctAnswer: string;
  options?: string[];
  orderIndex?: number;
}

export interface IWritingExercise {
  id?: number;
  lessonId?: number;
  prompt: string;
  sampleAnswer?: string;
  orderIndex?: number;
}

// ExerciseResult DTO - matches ExerciseResultDTO.java
export interface IExerciseResult {
  id?: number;
  userId?: number;
  lessonId?: number;
  exerciseType?: string;
  exerciseId?: number;
  userAnswer?: string;
  isCorrect?: boolean;
  score?: number;
  completedDate?: string;
}
