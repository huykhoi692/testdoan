import React from 'react';
import { Button, Space, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './cta.scss';

const { Title, Paragraph } = Typography;

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="container">
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Title level={2}>Ready to Start Learning?</Title>
          <Paragraph>Join 5,000+ learners and improve your language skills today.</Paragraph>
          <Button type="primary" size="large" icon={<RocketOutlined />} onClick={() => navigate('/register')}>
            Register for Free
          </Button>
        </Space>
      </div>
    </section>
  );
};

export default CTA;
