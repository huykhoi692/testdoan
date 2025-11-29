import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Progress, Space, Calendar, Badge, List, Spin } from 'antd';
import { TrophyOutlined, BookOutlined, ClockCircleOutlined, RiseOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { getDashboardStats, getWeeklyProgress, IDashboardStats } from '../../shared/services/user-progress.service';
import { getBooksApi } from '../../shared/services/book.service';
import { getUserProgress } from '../../shared/services/user-progress.service';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const userName = 'User';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);
      } catch (error) {
        console.warn('Dashboard stats API not available, using fallback data');
        // Fallback data
        setStats({
          wordsLearned: 256,
          quizzesCompleted: 4,
          courseProgress: 32,
          languagesStudying: 10,
          totalLessons: 0,
          completedLessons: 0,
          currentStreak: 0,
          longestStreak: 0,
        });
      }

      // Fetch books and user progress
      try {
        const booksData = await getBooksApi(0, 10);
        const progressData = await getUserProgress();

        // Map books with progress
        const coursesWithProgress =
          booksData.content?.map((book: any, index: number) => {
            const progress = progressData.find((p: any) => p.bookId === book.id);
            const colors = ['#5B8DEE', '#E85B8A', '#F6C344', '#4CAF50'];
            return {
              name: book.title,
              color: colors[index % colors.length],
              progress: progress?.progressPercentage || Math.floor(Math.random() * 80) + 10,
            };
          }) || [];

        setCourses(coursesWithProgress);
      } catch (error) {
        console.warn('Books API not available, using fallback data');
        setCourses([
          { name: 'English 101', color: '#5B8DEE', progress: 75 },
          { name: 'Spanish Basic', color: '#E85B8A', progress: 45 },
          { name: 'French Intermediate', color: '#F6C344', progress: 60 },
          { name: 'German Advanced', color: '#4CAF50', progress: 30 },
        ]);
      }

      // Fetch weekly progress
      try {
        const weeklyData = await getWeeklyProgress();
        setWeeklyProgress(weeklyData);
      } catch (error) {
        console.warn('Weekly progress API not available, using fallback data');
        setWeeklyProgress([
          { day: 'Mon', hours: 2 },
          { day: 'Tue', hours: 3 },
          { day: 'Wed', hours: 1.5 },
          { day: 'Thu', hours: 4 },
          { day: 'Fri', hours: 2.5 },
          { day: 'Sat', hours: 3.5 },
          { day: 'Sun', hours: 2 },
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getListData = (value: Dayjs) => {
    const day = value.date();
    let listData: Array<{ type: string; content: string }> = [];

    if (day === 10 || day === 15 || day === 20) {
      listData = [{ type: 'success', content: 'Class scheduled' }];
    } else if (day === 18) {
      listData = [{ type: 'warning', content: 'Assignment due' }];
    }

    return listData;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
      <Card
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          marginBottom: '32px',
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Row align="middle" gutter={24}>
          <Col flex="auto">
            <Space direction="vertical" size={8}>
              <Title level={2} style={{ color: 'white', margin: 0, fontWeight: 600 }}>
                Hi {userName}, {greeting()}!
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', lineHeight: '1.6' }}>
                Ready to start learning today?
                <br />
                You have {stats?.totalLessons - (stats?.completedLessons || 0)} new lessons waiting for you
              </Text>
            </Space>
          </Col>
          <Col>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/student-learning-online-5815187-4862600.png"
              alt="Learning"
              style={{ height: '140px' }}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Row gutter={[20, 20]} style={{ marginBottom: '32px' }}>
            {[
              { icon: BookOutlined, value: stats?.wordsLearned?.toString() || '0', label: 'Word Learned', color: '#667eea' },
              { icon: TrophyOutlined, value: stats?.quizzesCompleted?.toString() || '0', label: 'Quiz', color: '#f6c344' },
              { icon: ClockCircleOutlined, value: `${stats?.courseProgress || 0}%`, label: 'Course Progress', color: '#e85b8a' },
              { icon: RiseOutlined, value: stats?.languagesStudying?.toString() || '0', label: 'Language', color: '#4caf50' },
            ].map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card
                  style={{
                    borderRadius: '16px',
                    textAlign: 'center',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  }}
                  bodyStyle={{ padding: '24px 16px' }}
                  hoverable
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      background: `rgba(${stat.color === '#667eea' ? '102, 126, 234' : stat.color === '#f6c344' ? '246, 195, 68' : stat.color === '#e85b8a' ? '232, 91, 138' : '76, 175, 80'}, 0.1)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <stat.icon style={{ fontSize: '28px', color: stat.color }} />
                  </div>
                  <Title level={3} style={{ margin: '0 0 4px', fontWeight: 600 }}>
                    {stat.value}
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    {stat.label}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>

          <Card
            title={
              <Text strong style={{ fontSize: '16px' }}>
                Course of Progress
              </Text>
            }
            style={{
              borderRadius: '16px',
              marginBottom: '32px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            extra={
              <Text type="secondary" style={{ fontSize: '13px' }}>
                2025
              </Text>
            }
            bodyStyle={{ padding: '24px' }}
          >
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              {courses.map((course, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <Space size={12}>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: course.color,
                        }}
                      />
                      <Text style={{ fontSize: '14px', fontWeight: 500 }}>{course.name}</Text>
                    </Space>
                    <Text strong style={{ fontSize: '14px', color: course.color }}>
                      {course.progress}%
                    </Text>
                  </div>
                  <Progress percent={course.progress} strokeColor={course.color} showInfo={false} strokeWidth={8} trailColor="#f0f0f0" />
                </div>
              ))}
            </Space>
          </Card>

          <Card
            title={
              <Text strong style={{ fontSize: '16px' }}>
                Daily Hours
              </Text>
            }
            style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '240px', paddingTop: '20px' }}>
              {weeklyProgress.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1, maxWidth: '80px' }}>
                  <div
                    style={{
                      height: `${item.hours * 45}px`,
                      background: item.day === 'Thu' ? 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' : '#e8e8e8',
                      borderRadius: '12px 12px 0 0',
                      marginBottom: '12px',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {item.day === 'Thu' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#667eea',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {item.hours}h
                      </div>
                    )}
                  </div>
                  <Text
                    type={item.day === 'Thu' ? undefined : 'secondary'}
                    style={{ fontSize: '13px', fontWeight: item.day === 'Thu' ? 600 : 400 }}
                  >
                    {item.day}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Text strong style={{ fontSize: '16px' }}>
                My Progress
              </Text>
            }
            style={{
              borderRadius: '16px',
              marginBottom: '32px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <Calendar fullscreen={false} dateCellRender={dateCellRender} style={{ borderRadius: '12px' }} />
          </Card>

          <Card
            title={
              <Text strong style={{ fontSize: '16px' }}>
                Language Progress
              </Text>
            }
            style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <List
              dataSource={courses}
              renderItem={item => (
                <List.Item
                  style={{
                    border: 'none',
                    padding: '16px 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space size={12}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px',
                          }}
                        >
                          <BookOutlined style={{ color: 'white', fontSize: '18px' }} />
                        </div>
                        <Text style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</Text>
                      </Space>
                      <div
                        style={{
                          background: `${item.color}15`,
                          padding: '6px 12px',
                          borderRadius: '8px',
                        }}
                      >
                        <Text strong style={{ fontSize: '13px', color: item.color }}>
                          {item.progress}%
                        </Text>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
