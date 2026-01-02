import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Progress } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { startStudySession, updateProgress, completeStudySession } from 'app/shared/reducers/study-session.reducer';
import { getChapter } from 'app/shared/reducers/chapter.reducer';

export const StudySessionPage = () => {
  const dispatch = useAppDispatch();
  const { chapterId } = useParams<{ chapterId: string }>();
  const currentSession = useAppSelector(state => state.studySession.currentSession);
  const chapter = useAppSelector(state => state.chapter.entity);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapter(parseInt(chapterId, 10)));
    }
  }, [chapterId]);

  const handleStartSession = () => {
    if (chapterId) {
      dispatch(startStudySession(parseInt(chapterId, 10)));
    }
  };

  const handleUpdateProgress = (newProgress: number) => {
    if (currentSession?.id) {
      setProgress(newProgress);
      dispatch(
        updateProgress({
          sessionId: currentSession.id,
          progress: {
            progressPercentage: newProgress,
            currentScore: 0,
            isCompleted: newProgress === 100,
          },
        }),
      );
    }
  };

  const handleComplete = () => {
    if (currentSession?.id) {
      dispatch(completeStudySession(currentSession.id));
    }
  };

  return (
    <div className="study-session-container">
      <h2>{chapter?.title}</h2>
      <div className="study-progress">
        <Progress value={progress}>{progress}%</Progress>
      </div>

      <div className="session-controls">
        {!currentSession ? (
          <Button color="primary" onClick={handleStartSession}>
            Start Session
          </Button>
        ) : (
          <>
            <Button color="info" onClick={() => handleUpdateProgress(Math.min(progress + 10, 100))} disabled={progress >= 100}>
              Progress
            </Button>
            <Button color="success" onClick={handleComplete} disabled={progress < 100}>
              Complete
            </Button>
          </>
        )}
      </div>

      {chapter?.description && <div className="lesson-content mt-4">{chapter.description}</div>}
    </div>
  );
};
