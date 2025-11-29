import React from 'react';
import { Button, Row, Col, Typography, Space, Statistic } from 'antd';
import { RocketOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './hero.scss';

const { Title, Paragraph } = Typography;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="container">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={32} style={{ width: '100%' }}>
              <div>
                <Title level={1} className="hero-title">
                  Learn Languages
                  <br />
                  <span className="highlight">Through Reading</span>
                </Title>
                <Paragraph className="hero-subtitle">
                  Read your favorite books, learn vocabulary and grammar in a natural context. Our AI automatically analyzes books and
                  creates exercises for all 4 skills.
                </Paragraph>
              </div>

              <Space size="middle" className="hero-buttons">
                <Button type="primary" size="large" icon={<RocketOutlined />} onClick={() => navigate('/register')}>
                  Get Started for Free
                </Button>
                <Button size="large" icon={<PlayCircleOutlined />} onClick={() => navigate('/dashboard/books')} ghost>
                  Browse Library
                </Button>
              </Space>

              <Row gutter={32} className="hero-stats">
                <Col>
                  <Statistic title="Learners" value="5,000+" />
                </Col>
                <Col>
                  <Statistic title="Books" value="500+" />
                </Col>
                <Col>
                  <Statistic title="Satisfaction" value="98%" />
                </Col>
              </Row>
            </Space>
          </Col>

          <Col xs={24} lg={12}>
            <div className="hero-image-wrapper">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" alt="Learning" className="hero-image" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
