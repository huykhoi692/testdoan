import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Progress, Typography, Statistic, List, Tag, Avatar, Spin } from 'antd';
import { BookOutlined, FileTextOutlined, CheckCircleOutlined, TrophyOutlined, FireOutlined, LineChartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { PageHeader } from 'app/shared/components/PageHeader';
import { StatCard } from 'app/shared/components/StatCard';
import './student-dashboard.scss';
import DashboardLayout from 'app/shared/layout/dashboard-layout';
import axios from 'axios';
import { IBook } from 'app/shared/model/book.model';

const { Title, Text } = Typography;

interface LearningReport {
  totalBooks: number;
  booksCompleted: number;
  totalChapters: number;
  chaptersCompleted: number;
  totalWords: number;
  wordsLearned: number;
  totalExercises: number;
  exercisesCompleted: number;
  recentBooks?: IBook[];
}

export const StudentDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<LearningReport | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const reportResponse = await axios.get('/api/learning-reports/my-progress');
        setReport(reportResponse.data);

        const streakResponse = await axios.get('/api/learning-streaks/current');
        setStreak(streakResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const vocabPercentage = report ? Math.round((report.wordsLearned / report.totalWords) * 100) : 0;
  const exercisePercentage = report ? Math.round((report.exercisesCompleted / report.totalExercises) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="student-dashboard">
        <div className="dashboard-greeting">
          <Title level={3}>
            {greeting()}, {account?.firstName || 'Học viên'}!
          </Title>
          <Text type="secondary">Tiếp tục hành trình học tiếng Hàn của bạn</Text>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="dashboard-stats">
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Từ vựng đã học"
              value={report ? `${report.wordsLearned}/${report.totalWords}` : '...'}
              icon={<BookOutlined />}
              color="#3b82f6"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Bài tập hoàn thành"
              value={report ? `${report.exercisesCompleted}/${report.totalExercises}` : '...'}
              icon={<CheckCircleOutlined />}
              color="#f59e0b"
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Chuỗi học tập"
              value={`${streak} ngày`}
              icon={<FireOutlined />}
              color="#ef4444"
              loading={loading}
              suffix={<FireOutlined style={{ color: '#ef4444' }} />}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Sách đã hoàn thành"
              value={report ? `${report.booksCompleted}/${report.totalBooks}` : '...'}
              icon={<TrophyOutlined />}
              color="#10b981"
              loading={loading}
            />
          </Col>
        </Row>

        {/* Progress Section */}
        <Row gutter={[16, 16]} className="dashboard-progress">
          <Col xs={24} lg={16}>
            <Card
              title={
                <span>
                  <LineChartOutlined /> Tiến độ học tập
                </span>
              }
              className="progress-card"
            >
              <Spin spinning={loading}>
                <div className="progress-item">
                  <div className="progress-header">
                    <Text strong>Từ vựng</Text>
                    <Text type="secondary">{report ? `${report.wordsLearned}/${report.totalWords}` : ''}</Text>
                  </div>
                  <Progress percent={vocabPercentage} strokeColor="#3b82f6" trailColor="#e5e7eb" className="progress-bar" />
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <Text strong>Bài tập</Text>
                    <Text type="secondary">{report ? `${report.exercisesCompleted}/${report.totalExercises}` : ''}</Text>
                  </div>
                  <Progress percent={exercisePercentage} strokeColor="#f59e0b" trailColor="#e5e7eb" className="progress-bar" />
                </div>
              </Spin>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <span>
                  <TrophyOutlined /> Thành tích
                </span>
              }
              className="achievement-card"
            >
              <Spin spinning={loading}>
                {/* This can be populated from a separate achievements API call in the future */}
                <div className="achievement-grid">
                  <div className="achievement-item earned">
                    <div className="achievement-icon">🏆</div>
                    <Text className="achievement-name">Người mới</Text>
                  </div>
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>

        {/* Recent Books */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card
              title={
                <span>
                  <BookOutlined /> Sách đang học
                </span>
              }
              extra={<a href="/dashboard/books">Xem tất cả</a>}
            >
              <Spin spinning={loading}>
                <List
                  itemLayout="horizontal"
                  dataSource={report?.recentBooks}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <a key="continue" href={`/dashboard/books/${item.id}`}>
                          Tiếp tục học
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar shape="square" size={64} src={item.thumbnailUrl}>
                            <BookOutlined />
                          </Avatar>
                        }
                        title={<a href={`/dashboard/books/${item.id}`}>{item.title}</a>}
                        description={
                          <div style={{ marginTop: 8 }}>
                            <Progress percent={0} size="small" /> {/* Progress per book needs another API call */}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
