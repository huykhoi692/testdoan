import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space, Row, Col, Alert, message, Spin, Input, Tag } from 'antd';
import { EditOutlined, CheckCircleOutlined, LeftOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { updateChapterProgress } from 'app/shared/services/progress.service';
import { getWritingExercise, submitWritingAnswer } from 'app/shared/services/exercise.service';
import { IWritingExercise } from 'app/shared/model/writing-exercise.model';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const WritingExercise: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [exercise, setExercise] = useState<IWritingExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    if (!exerciseId) return;

    const fetchExercise = async () => {
      setLoading(true);
      try {
        // Fetch real exercise from API
        const exerciseData = await dispatch(getWritingExercise(parseInt(exerciseId, 10))).unwrap();
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

  const countWords = (text: string) => {
    // Count Korean characters as words
    const koreanChars = text.match(/[\uAC00-\uD7A3]/g);
    return koreanChars ? koreanChars.length : 0;
  };

  const wordCount = countWords(userAnswer);
  const minWords = 50; // Minimum Korean characters required
  const isEnoughWords = wordCount >= minWords;

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      message.warning('Vui lòng viết bài trước khi nộp');
      return;
    }

    if (!isEnoughWords) {
      message.warning(`Bài viết của bạn cần ít nhất ${minWords} ký tự tiếng Hàn`);
      return;
    }

    setIsSubmitted(true);
    message.success('Bài viết đã được gửi! 🎉');

    // Update progress
    if (exercise?.chapter?.id) {
      dispatch(
        updateChapterProgress({
          chapterId: exercise.chapter.id,
          completed: true,
        }),
      );
    }

    // Submit result to backend
    if (exercise) {
      dispatch(
        submitWritingAnswer({
          exerciseId: exercise.id,
          answer: userAnswer,
          score: exercise.maxScore, // Assuming full score for completion in this demo
        }),
      );
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setIsSubmitted(false);
    setShowSample(false);
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
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
            }}
          >
            <FormOutlined style={{ fontSize: '40px', color: '#fff' }} />
          </div>
          <Title level={2} style={{ marginBottom: '8px', color: '#1a1a1a' }}>
            Bài tập Luyện viết
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Rèn luyện kỹ năng viết tiếng Hàn
          </Text>
        </div>

        {/* Instructions */}
        <Card
          style={{
            background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%)',
            border: '2px solid rgba(240, 147, 251, 0.2)',
            borderRadius: '12px',
            marginBottom: '32px',
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ fontSize: '16px', color: '#1a1a1a' }}>
                <InfoCircleOutlined style={{ marginRight: '8px', color: '#f093fb' }} />
                Yêu cầu đề bài:
              </Text>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#262626', marginTop: '12px', marginBottom: 0 }}>
                {exercise.prompt}
              </Paragraph>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" style={{ background: 'white', border: '1px solid rgba(240, 147, 251, 0.3)' }}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Số ký tự tối thiểu:
                    </Text>
                    <Text strong style={{ fontSize: '18px', color: '#f093fb' }}>
                      {minWords} ký tự
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" style={{ background: 'white', border: '1px solid rgba(240, 147, 251, 0.3)' }}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Điểm tối đa:
                    </Text>
                    <Text strong style={{ fontSize: '18px', color: '#f093fb' }}>
                      {exercise.maxScore} điểm
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Space>
        </Card>

        {/* Writing Area */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ marginBottom: 0, color: '#1a1a1a' }}>
              <EditOutlined style={{ marginRight: '8px', color: '#f093fb' }} />
              Bài viết của bạn:
            </Title>
            <Space>
              <Tag color={isEnoughWords ? 'success' : 'warning'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                {wordCount} / {minWords} ký tự
              </Tag>
            </Space>
          </div>

          <TextArea
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="Bắt đầu viết bằng tiếng Hàn..."
            disabled={isSubmitted}
            autoSize={{ minRows: 8, maxRows: 12 }}
            style={{
              fontSize: '16px',
              lineHeight: '1.8',
              borderRadius: '12px',
              border: '2px solid rgba(240, 147, 251, 0.2)',
              fontFamily: "'Noto Sans KR', sans-serif",
              background: isSubmitted ? '#f5f5f5' : 'white',
            }}
          />

          {!isEnoughWords && userAnswer.length > 0 && (
            <Text type="warning" style={{ marginTop: '8px', display: 'block' }}>
              ⚠️ Bạn cần viết thêm {minWords - wordCount} ký tự nữa
            </Text>
          )}
        </div>

        {/* Sample Answer */}
        {exercise.sampleAnswer && (
          <Card
            style={{
              background: 'rgba(102, 126, 234, 0.05)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '12px',
              marginBottom: '32px',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <Button type="link" onClick={() => setShowSample(!showSample)} style={{ padding: 0, fontSize: '15px' }}>
                {showSample ? '▼' : '▶'} Xem bài mẫu tham khảo
              </Button>
            </div>
            {showSample && (
              <div
                style={{
                  padding: '16px',
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                }}
              >
                <Paragraph
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#262626',
                    fontFamily: "'Noto Sans KR', sans-serif",
                    marginBottom: 0,
                  }}
                >
                  {exercise.sampleAnswer}
                </Paragraph>
              </div>
            )}
          </Card>
        )}

        {/* Result Message */}
        {isSubmitted && (
          <Alert
            message="🎉 Đã nộp bài!"
            description={`Bài viết của bạn đã được gửi thành công! Bạn được +${exercise.maxScore} điểm. Tiếp tục luyện tập để cải thiện kỹ năng viết nhé!`}
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
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
                disabled={!isEnoughWords || !userAnswer.trim()}
                style={{
                  height: '48px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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

        {/* Tips */}
        <Card
          style={{
            marginTop: '24px',
            background: 'rgba(240, 147, 251, 0.05)',
            border: '1px solid rgba(240, 147, 251, 0.2)',
            borderRadius: '12px',
          }}
        >
          <Space direction="vertical" size="small">
            <Text strong style={{ color: '#f093fb' }}>
              💡 Mẹo viết bài:
            </Text>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              • Sử dụng từ vựng và ngữ pháp đã học trong chương
            </Text>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              • Viết câu đơn giản và rõ ràng, tránh câu quá dài
            </Text>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              • Kiểm tra chính tả và ngữ pháp trước khi nộp bài
            </Text>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              • Tham khảo bài mẫu để học cách diễn đạt tự nhiên
            </Text>
          </Space>
        </Card>
      </Card>
    </div>
  );
};

export default WritingExercise;
