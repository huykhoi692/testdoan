import React from 'react';
import { Card, Col, Row, Space, Typography } from 'antd';
import { BookOutlined, RocketOutlined, TrophyOutlined, GlobalOutlined } from '@ant-design/icons';

import './features.scss';

const { Title, Paragraph } = Typography;

const Features = () => {
  const features = [
    {
      icon: <BookOutlined />,
      title: 'Learn Through Books',
      description: 'Read real-world novels and stories, learning vocabulary and grammar in a natural context.',
    },
    {
      icon: <RocketOutlined />,
      title: 'AI Analysis',
      description: 'Our AI system automatically analyzes books, creating exercises and vocabulary tailored to your level.',
    },
    {
      icon: <TrophyOutlined />,
      title: '4-Skill Practice',
      description: 'Listening, speaking, reading, and writing: comprehensive practice with diverse exercises.',
    },
    {
      icon: <GlobalOutlined />,
      title: 'Track Your Progress',
      description: 'Detailed statistics on your learning progress, vocabulary acquired, and completed exercises.',
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-title">
          <Title level={2}>Why Choose LangLeague?</Title>
          <Paragraph>An effective method for learning languages by reading real books.</Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card hoverable className="feature-card">
                <Space direction="vertical" size={16}>
                  <div className="feature-icon">{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph type="secondary">{feature.description}</Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Features;
