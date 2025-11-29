import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space, Radio, Row, Col, Progress, message, Spin, Alert } from 'antd';
import { SoundOutlined, CheckCircleOutlined, CloseCircleOutlined, LeftOutlined, AudioOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { updateChapterProgress } from 'app/shared/services/progress.service';
import { getListeningExercise, submitListeningAnswer } from 'app/shared/services/exercise.service';
import { IListeningExercise } from 'app/shared/model/listening-exercise.model';

const { Title, Text, Paragraph } = Typography;

const ListeningExercise: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [exercise, setExercise] = useState<IListeningExercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    if (!exerciseId) return;

    const fetchExercise = async () => {
      setLoading(true);
      try {
        // Fetch real exercise from API
        const exerciseData = await dispatch(getListeningExercise(parseInt(exerciseId, 10))).unwrap();
        setExercise(exerciseData);
      } catch (error) {
        console.error('Error fetching exercise:', error);
        message.error('Không thể tải bài tập');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId, dispatch]);

  const handlePlayAudio = () => {
    setAudioPlaying(true);
    message.info('Đang phát audio... (Demo: Audio file chưa có)');
    setTimeout(() => setAudioPlaying(false), 2000);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      message.warning('Vui lòng chọn một đáp án');
      return;
    }

    const correct = selectedAnswer === exercise?.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      message.success('Chính xác! Bạn đã trả lời đúng! 🎉');
      // Update progress
      if (exercise?.chapter?.id) {
        dispatch(
          updateChapterProgress({
            chapterId: exercise.chapter.id,
            completed: true,
          }),
        );
      }
    } else {
      message.error('Chưa đúng. Hãy thử lại nhé! 💪');
    }

    // Submit result to backend
    if (exercise) {
      dispatch(
        submitListeningAnswer({
          exerciseId: exercise.id,
          answer: selectedAnswer,
          score: correct ? exercise.maxScore : 0,
        }),
      );
    }
  };

  const handleRetry = () => {
    setSelectedAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" tip="Đang tải bài tập..." />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Alert message="Không tìm thấy bài tập" type="warning" showIcon />
        <Button type="primary" onClick={handleBack} style={{ marginTop: '20px' }}>
          Quay lại
        </Button>
      </div>
    );
  }

  const answerOptions =
    exercise?.options?.map(opt => ({
      value: opt.id.toString(), // Assuming option ID is used as value, or maybe label/content?
      label: opt.content, // Assuming content is the text to display
    })) || [];

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Button icon={<LeftOutlined />} onClick={handleBack} type="text" size="large">
          Quay lại
        </Button>
      </div>

      <Card
        style={{
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.1)',
          border: '2px solid rgba(102, 126, 234, 0.1)',
        }}
      >
        {/* Exercise Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
          >
            <AudioOutlined style={{ fontSize: '40px', color: '#fff' }} />
          </div>
          <Title level={2} style={{ marginBottom: '8px', color: '#1a1a1a' }}>
            Bài tập Luyện nghe
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Nghe kỹ và chọn đáp án đúng nhất
          </Text>
        </div>

        {/* Audio Player */}
        <Card
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            border: '2px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            marginBottom: '32px',
          }}
        >
          <Row align="middle" justify="center" gutter={16}>
            <Col>
              <Button
                type="primary"
                size="large"
                icon={<SoundOutlined />}
                onClick={handlePlayAudio}
                loading={audioPlaying}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  height: '56px',
                  fontSize: '16px',
                  borderRadius: '28px',
                  padding: '0 32px',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                }}
              >
                {audioPlaying ? 'Đang phát...' : 'Phát Audio'}
              </Button>
            </Col>
            <Col>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Bạn có thể nghe lại nhiều lần
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Question */}
        <div style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '20px', color: '#1a1a1a' }}>
            Câu hỏi:
          </Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', color: '#262626' }}>{exercise.question}</Paragraph>
        </div>

        {/* Answer Options */}
        <div style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '20px', color: '#1a1a1a' }}>
            Chọn đáp án:
          </Title>
          <Radio.Group
            value={selectedAnswer}
            onChange={e => setSelectedAnswer(e.target.value)}
            disabled={isSubmitted}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {answerOptions.map(option => (
                <Card
                  key={option.value}
                  hoverable={!isSubmitted}
                  style={{
                    border:
                      selectedAnswer === option.value
                        ? '2px solid #667eea'
                        : isSubmitted && option.value === exercise.correctAnswer
                          ? '2px solid #52c41a'
                          : isSubmitted && selectedAnswer === option.value
                            ? '2px solid #ff4d4f'
                            : '1px solid #d9d9d9',
                    background:
                      selectedAnswer === option.value
                        ? 'rgba(102, 126, 234, 0.05)'
                        : isSubmitted && option.value === exercise.correctAnswer
                          ? 'rgba(82, 196, 26, 0.05)'
                          : 'white',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                  }}
                >
                  <Radio value={option.value} style={{ width: '100%' }}>
                    <Text style={{ fontSize: '16px', fontWeight: selectedAnswer === option.value ? 600 : 400 }}>{option.label}</Text>
                    {isSubmitted && option.value === exercise.correctAnswer && (
                      <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '12px', fontSize: '18px' }} />
                    )}
                    {isSubmitted && selectedAnswer === option.value && !isCorrect && (
                      <CloseCircleOutlined style={{ color: '#ff4d4f', marginLeft: '12px', fontSize: '18px' }} />
                    )}
                  </Radio>
                </Card>
              ))}
            </Space>
          </Radio.Group>
        </div>

        {/* Result Message */}
        {isSubmitted && (
          <Alert
            message={isCorrect ? '🎉 Chính xác!' : '❌ Chưa đúng'}
            description={
              isCorrect
                ? `Bạn đã trả lời đúng! Đáp án là ${exercise.correctAnswer}. Bạn được +${exercise.maxScore} điểm.`
                : `Đáp án đúng là ${exercise.correctAnswer}. Hãy thử lại để hiểu rõ hơn nhé!`
            }
            type={isCorrect ? 'success' : 'error'}
            showIcon
            style={{ marginBottom: '24px', borderRadius: '12px' }}
          />
        )}

        {/* Action Buttons */}
        <Row gutter={16}>
          {!isSubmitted ? (
            <Col span={24}>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                block
                disabled={!selectedAnswer}
                style={{
                  height: '48px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontWeight: 600,
                }}
              >
                Nộp bài
              </Button>
            </Col>
          ) : (
            <>
              <Col span={12}>
                <Button size="large" onClick={handleRetry} block style={{ height: '48px', fontSize: '16px', borderRadius: '12px' }}>
                  Làm lại
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleBack}
                  block
                  style={{
                    height: '48px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                    border: 'none',
                  }}
                >
                  Tiếp tục học
                </Button>
              </Col>
            </>
          )}
        </Row>

        {/* Score Info */}
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <Text type="secondary">
            Điểm tối đa:{' '}
            <Text strong style={{ color: '#667eea' }}>
              {exercise.maxScore} điểm
            </Text>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default ListeningExercise;
