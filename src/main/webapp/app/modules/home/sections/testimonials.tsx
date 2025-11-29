import React from 'react';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import './testimonials.scss';

const { Title, Paragraph, Text } = Typography;

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Minh Anh Nguyen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Learner',
      content: 'Reading books helps me learn vocabulary very quickly. The AI analysis of vocabulary and grammar is very detailed!',
      rating: 5,
    },
    {
      name: 'Duc Anh Tran',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Learner',
      content:
        'A great platform! I can read my favorite stories and learn at the same time. The 4-skill exercises are diverse and practical.',
      rating: 5,
    },
    {
      name: 'Huong Le',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Learner',
      content: 'The progress tracking system is great! Every day I am motivated to read and learn more.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <Title level={2}>What Our Learners Say</Title>
          <Paragraph>Real reviews from our learners.</Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="testimonial-card">
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>

                  <Paragraph className="content">"{testimonial.content}"</Paragraph>

                  <div className="author">
                    <Avatar src={testimonial.avatar} size={48} />
                    <div>
                      <Text strong>{testimonial.name}</Text>
                      <Text type="secondary">{testimonial.role}</Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Testimonials;
