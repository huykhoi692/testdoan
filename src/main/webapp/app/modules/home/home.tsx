import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Typography, Space, Statistic, Avatar } from 'antd';
import {
  RocketOutlined,
  TrophyOutlined,
  TeamOutlined,
  GlobalOutlined,
  StarFilled,
  PlayCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '40px', color: '#667eea' }} />,
      title: 'Learn Faster',
      description: 'Master languages 3x faster with our proven methodology and interactive lessons',
    },
    {
      icon: <TrophyOutlined style={{ fontSize: '40px', color: '#f6c344' }} />,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and achievement badges',
    },
    {
      icon: <TeamOutlined style={{ fontSize: '40px', color: '#e85b8a' }} />,
      title: 'Practice Together',
      description: 'Join a community of learners and practice with native speakers',
    },
    {
      icon: <GlobalOutlined style={{ fontSize: '40px', color: '#5b8dee' }} />,
      title: 'Multiple Languages',
      description: 'Choose from Korean, English, Japanese, Chinese, and more',
    },
  ];

  const courses = [
    {
      title: 'Korean Language',
      subtitle: '한국어',
      level: 'Beginner to Advanced',
      students: '12,450',
      rating: 4.8,
      image: 'content/images/Langleague.jpg',
      color: '#667eea',
    },
    {
      title: 'English Language',
      subtitle: 'English',
      level: 'All Levels',
      students: '25,890',
      rating: 4.9,
      image: 'content/images/Langleague.jpg',
      color: '#5b8dee',
    },
    {
      title: 'Japanese Language',
      subtitle: '日本語',
      level: 'Beginner to Intermediate',
      students: '8,720',
      rating: 4.7,
      image: 'content/images/Langleague.jpg',
      color: '#e85b8a',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'content/images/jhipster_family_member_1_head-192.png',
      role: 'Korean Learner',
      content: 'This platform helped me pass TOPIK Level 2 in just 6 months! The structured lessons and practice materials are excellent.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      avatar: 'content/images/jhipster_family_member_2_head-192.png',
      role: 'English Student',
      content: 'Best language learning experience ever! The interactive approach makes learning fun and effective.',
      rating: 5,
    },
    {
      name: 'Emma Wilson',
      avatar: 'content/images/jhipster_family_member_3_head-192.png',
      role: 'Japanese Learner',
      content: 'I love how the platform tracks my progress. Seeing my improvement motivates me to keep learning every day!',
      rating: 5,
    },
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: windowWidth <= 768 ? '60px 20px' : '100px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <div>
                  <Title
                    level={1}
                    style={{
                      color: 'white',
                      fontSize: windowWidth <= 768 ? '32px' : '56px',
                      marginBottom: '16px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    Master Any Language
                    <br />
                    <span
                      style={{
                        background: 'linear-gradient(90deg, #fff 0%, #f0f0f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Faster & Easier
                    </span>
                  </Title>
                  <Paragraph
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: windowWidth <= 768 ? '16px' : '18px',
                      marginBottom: 0,
                    }}
                  >
                    Join thousands of learners worldwide. Learn Korean, English, Japanese and more with interactive lessons, real
                    conversations, and expert guidance.
                  </Paragraph>
                </div>

                <Space size="middle" style={{ flexWrap: 'wrap' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<RocketOutlined />}
                    onClick={() => navigate('/register')}
                    style={{
                      height: '56px',
                      padding: '0 40px',
                      fontSize: '16px',
                      fontWeight: 600,
                      background: 'white',
                      color: '#667eea',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  >
                    Start Learning Free
                  </Button>
                  <Button
                    size="large"
                    icon={<PlayCircleOutlined />}
                    style={{
                      height: '56px',
                      padding: '0 40px',
                      fontSize: '16px',
                      fontWeight: 600,
                      background: 'transparent',
                      color: 'white',
                      border: '2px solid white',
                      borderRadius: '8px',
                    }}
                  >
                    Watch Demo
                  </Button>
                </Space>

                <Row gutter={32} style={{ marginTop: '24px' }}>
                  <Col>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Active Learners</span>}
                      value="50,000+"
                      valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 700 }}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Languages</span>}
                      value="15+"
                      valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 700 }}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Success Rate</span>}
                      value="94%"
                      valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 700 }}
                    />
                  </Col>
                </Row>
              </Space>
            </Col>

            <Col xs={24} lg={12}>
              <div style={{ position: 'relative' }}>
                <img
                  src="content/images/Langleague.jpg"
                  alt="Learning"
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: windowWidth <= 768 ? '60px 20px' : '100px 40px',
          background: '#fafafa',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ fontSize: windowWidth <= 768 ? '28px' : '40px' }}>
              Why Choose Langleague?
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#595959', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to achieve fluency, all in one powerful platform
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    height: '100%',
                    textAlign: 'center',
                  }}
                  bodyStyle={{ padding: '40px 24px' }}
                >
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    {feature.icon}
                    <Title level={4} style={{ margin: 0 }}>
                      {feature.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {feature.description}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        style={{
          padding: windowWidth <= 768 ? '60px 20px' : '100px 40px',
          background: 'white',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ fontSize: windowWidth <= 768 ? '28px' : '40px' }}>
              Popular Courses
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#595959' }}>Start your journey with our most loved language courses</Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {courses.map((course, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: '240px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={course.image}
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
                          top: 16,
                          right: 16,
                          background: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        <StarFilled style={{ color: '#fadb14', fontSize: '16px' }} />
                        <Text strong>{course.rating}</Text>
                      </div>
                    </div>
                  }
                  style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div>
                      <Title level={4} style={{ margin: 0 }}>
                        {course.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: '18px' }}>
                        {course.subtitle}
                      </Text>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                        borderTop: '1px solid #f0f0f0',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      <Text type="secondary" style={{ fontSize: '13px' }}>
                        {course.level}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '13px' }}>
                        <TeamOutlined /> {course.students} students
                      </Text>
                    </div>

                    <Button
                      type="primary"
                      block
                      size="large"
                      icon={<ArrowRightOutlined />}
                      onClick={() => navigate('/register')}
                      style={{
                        background: course.color,
                        border: 'none',
                        borderRadius: '8px',
                        marginTop: '8px',
                      }}
                    >
                      Enroll Now
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        style={{
          padding: windowWidth <= 768 ? '60px 20px' : '100px 40px',
          background: '#fafafa',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ fontSize: windowWidth <= 768 ? '28px' : '40px' }}>
              What Our Students Say
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#595959' }}>Join thousands of successful language learners</Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    height: '100%',
                  }}
                  bodyStyle={{ padding: '32px' }}
                >
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarFilled key={i} style={{ color: '#fadb14', fontSize: '18px' }} />
                      ))}
                    </div>

                    <Paragraph style={{ fontSize: '15px', color: '#595959', lineHeight: 1.8 }}>"{testimonial.content}"</Paragraph>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                      <Avatar src={testimonial.avatar} size={48} />
                      <div>
                        <Text strong style={{ display: 'block' }}>
                          {testimonial.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '13px' }}>
                          {testimonial.role}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: windowWidth <= 768 ? '60px 20px' : '80px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Title
              level={2}
              style={{
                color: 'white',
                fontSize: windowWidth <= 768 ? '28px' : '40px',
                marginBottom: 0,
              }}
            >
              Ready to Start Your Language Journey?
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: 0 }}>
              Join 50,000+ learners and start speaking a new language today
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/register')}
              style={{
                height: '56px',
                padding: '0 48px',
                fontSize: '16px',
                fontWeight: 600,
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
              }}
            >
              Get Started for Free
            </Button>
          </Space>
        </div>
      </section>
    </div>
  );
};

export default Home;
