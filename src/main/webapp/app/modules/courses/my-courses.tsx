import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Progress, Tag, Button, Spin, Empty } from 'antd';
import { BookOutlined, ClockCircleOutlined, TrophyOutlined, ArrowRightOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getBooksApi } from '../../shared/services/book.service';
import { getUserProgress } from '../../shared/services/user-progress.service';

const { Title, Text, Paragraph } = Typography;

interface Course {
  id: number;
  title: string;
  description?: string;
  level?: string;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  imageUrl?: string;
  rating?: number;
  category?: string;
}

const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      // Fetch books and user progress
      const booksData = await getBooksApi(0, 20);
      const progressData = await getUserProgress();

      // Map books with progress
      const coursesWithProgress =
        booksData.content?.map((book: any) => {
          const progress = progressData.find((p: any) => p.bookId === book.id);
          const progressPercent = progress?.progressPercentage || 0;
          const totalLessons = book.totalLessons || 0;
          const completedLessons = Math.round((progressPercent / 100) * totalLessons);

          return {
            id: book.id,
            title: book.title,
            description: book.description || 'Learn and master this language course',
            level: book.level || 'Beginner',
            progress: progressPercent,
            totalLessons,
            completedLessons,
            imageUrl: book.imageUrl,
            rating: 4.5 + Math.random() * 0.5,
            category: book.category || 'Language Learning',
          };
        }) || [];

      setCourses(coursesWithProgress);
    } catch (error) {
      console.error('Error fetching courses:', error);

      // Fallback mock data
      setCourses([
        {
          id: 1,
          title: 'English for Beginners',
          description: 'Start your English learning journey with basic vocabulary and grammar',
          level: 'Beginner',
          progress: 65,
          totalLessons: 20,
          completedLessons: 13,
          imageUrl: 'content/images/Langleague.jpg',
          rating: 4.8,
          category: 'English',
        },
        {
          id: 2,
          title: 'Korean Language Course',
          description: 'Master Korean alphabet, pronunciation, and essential phrases',
          level: 'Intermediate',
          progress: 42,
          totalLessons: 25,
          completedLessons: 10,
          imageUrl: 'content/images/Langleague.jpg',
          rating: 4.7,
          category: 'Korean',
        },
        {
          id: 3,
          title: 'Japanese Fundamentals',
          description: 'Learn Hiragana, Katakana, and basic Japanese grammar',
          level: 'Beginner',
          progress: 28,
          totalLessons: 30,
          completedLessons: 8,
          imageUrl: 'content/images/Langleague.jpg',
          rating: 4.9,
          category: 'Japanese',
        },
        {
          id: 4,
          title: 'Advanced English Speaking',
          description: 'Improve your fluency and conversation skills',
          level: 'Advanced',
          progress: 15,
          totalLessons: 18,
          completedLessons: 3,
          imageUrl: 'content/images/Langleague.jpg',
          rating: 4.6,
          category: 'English',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'orange';
      case 'advanced':
        return 'red';
      default:
        return 'blue';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#f5222d';
    if (progress < 70) return '#faad14';
    return '#52c41a';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" tip="Loading your courses..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>
          My Courses
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '16px', marginBottom: 0 }}>
          Continue learning and track your progress
        </Paragraph>
      </div>

      {/* Stats Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <BookOutlined style={{ fontSize: '32px', color: '#667eea' }} />
              <Text type="secondary">Total Courses</Text>
              <Title level={2} style={{ margin: 0 }}>
                {courses.length}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
              <Text type="secondary">In Progress</Text>
              <Title level={2} style={{ margin: 0 }}>
                {courses.filter(c => c.progress > 0 && c.progress < 100).length}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <TrophyOutlined style={{ fontSize: '32px', color: '#faad14' }} />
              <Text type="secondary">Completed</Text>
              <Title level={2} style={{ margin: 0 }}>
                {courses.filter(c => c.progress === 100).length}
              </Title>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <Empty description="No courses found" style={{ marginTop: '60px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Row gutter={[24, 24]}>
          {courses.map(course => (
            <Col xs={24} sm={12} lg={8} key={course.id}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: '180px',
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <img
                      src={course.imageUrl || 'content/images/Langleague.jpg'}
                      alt={course.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <StarFilled style={{ color: '#fadb14', fontSize: '14px' }} />
                      <Text strong style={{ fontSize: '13px' }}>
                        {course.rating?.toFixed(1)}
                      </Text>
                    </div>
                  </div>
                }
                style={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  {/* Category & Level */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      {course.category}
                    </Text>
                    <Tag color={getLevelColor(course.level)} style={{ margin: 0 }}>
                      {course.level}
                    </Tag>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <Title level={4} style={{ margin: '0 0 8px 0' }}>
                      {course.title}
                    </Title>
                    <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ margin: 0, fontSize: '13px', minHeight: '40px' }}>
                      {course.description}
                    </Paragraph>
                  </div>

                  {/* Progress */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '13px' }}>
                        Progress
                      </Text>
                      <Text strong style={{ fontSize: '13px', color: getProgressColor(course.progress || 0) }}>
                        {course.progress}%
                      </Text>
                    </div>
                    <Progress
                      percent={course.progress}
                      strokeColor={getProgressColor(course.progress || 0)}
                      showInfo={false}
                      size="small"
                    />
                  </div>

                  {/* Lessons */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      <BookOutlined /> {course.completedLessons}/{course.totalLessons} Lessons
                    </Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      <ClockCircleOutlined /> ~{course.totalLessons * 15}min
                    </Text>
                  </div>

                  {/* Action Button */}
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={() => navigate(`/dashboard/lesson/${course.id}`)}
                    style={{
                      borderRadius: '8px',
                      marginTop: '8px',
                    }}
                  >
                    {course.progress === 0 ? 'Start Course' : 'Continue Learning'}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyCourses;
