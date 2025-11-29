import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, Typography, Radio, Space, Progress } from 'antd';
import axios from 'axios';
import { IChapter } from 'app/shared/model/chapter.model';
import { IReadingExercise } from 'app/shared/model/reading-exercise.model';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Title, Text } = Typography;

const Quiz = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [exercises, setExercises] = useState<IReadingExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        // Assuming exercises are part of the chapter data
        const response = await axios.get(`/api/chapters/${chapterId}`);
        setChapter(response.data);
        setExercises(response.data.readingExercises || []);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchQuizData();
    }
  }, [chapterId]);

  const handleNext = () => {
    const isCorrect = selectedAnswer?.toString() === exercises[currentExerciseIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      // Submit final score
      const finalScore = score + (isCorrect ? 1 : 0);
      axios
        .post('/api/exercise-results/submit', {
          chapterId,
          score: (finalScore / exercises.length) * 100,
          exerciseType: 'READING',
        })
        .catch(err => console.error('Failed to submit score', err));
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Spin />
      </DashboardLayout>
    );
  }

  if (isFinished) {
    return (
      <DashboardLayout>
        <Card>
          <Title level={2}>Quiz Complete!</Title>
          <Text>
            Your score: {score} / {exercises.length}
          </Text>
          <br />
          <Button onClick={() => navigate(`/dashboard/books/${chapter?.book?.id}`)}>Back to Book</Button>
        </Card>
      </DashboardLayout>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];
  const currentOptions = currentExercise?.readingOptions || [];

  return (
    <DashboardLayout>
      <Card>
        <Progress percent={((currentExerciseIndex + 1) / exercises.length) * 100} />
        <Title level={3}>{currentExercise?.question}</Title>
        <Text>{currentExercise?.passage}</Text>
        <br />
        <br />
        <Radio.Group onChange={e => setSelectedAnswer(e.target.value)} value={selectedAnswer}>
          <Space direction="vertical">
            {currentOptions.length > 0 ? (
              currentOptions
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map(option => (
                  <Radio key={option.id} value={option.id}>
                    {option.content}
                  </Radio>
                ))
            ) : (
              <Text type="secondary">No options available</Text>
            )}
          </Space>
        </Radio.Group>
        <br />
        <Button onClick={handleNext} disabled={selectedAnswer === null} style={{ marginTop: 24 }}>
          {currentExerciseIndex < exercises.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </Card>
    </DashboardLayout>
  );
};

export default Quiz;
