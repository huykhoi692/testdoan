import React from 'react';
import { Row, Col, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import './footer.css';

const { Title, Text } = Typography;

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} lg={6}>
            <Space direction="vertical" size="middle">
              <div className="footer-logo">
                <img src="content/images/logo.png" alt="Langleague" style={{ height: '36px', objectFit: 'contain' }} />
                <Title level={4} style={{ margin: 0, color: 'white' }}>
                  Langleague
                </Title>
              </div>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                Master any language faster and easier with our interactive learning platform.
              </Text>
              <Space size="large">
                <a href="#" className="social-link">
                  <FacebookOutlined />
                </a>
                <a href="#" className="social-link">
                  <TwitterOutlined />
                </a>
                <a href="#" className="social-link">
                  <InstagramOutlined />
                </a>
                <a href="#" className="social-link">
                  <YoutubeOutlined />
                </a>
              </Space>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '24px' }}>
              Platform
            </Title>
            <Space direction="vertical" size="middle">
              <Link to="/courses" className="footer-link">
                Browse Courses
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/pricing" className="footer-link">
                Pricing
              </Link>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '24px' }}>
              Support
            </Title>
            <Space direction="vertical" size="middle">
              <Link to="/help" className="footer-link">
                Help Center
              </Link>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Title level={5} style={{ color: 'white', marginBottom: '24px' }}>
              Contact
            </Title>
            <Space direction="vertical" size="middle">
              <div className="contact-item">
                <MailOutlined />
                <span>support@langleague.com</span>
              </div>
              <div className="contact-item">
                <PhoneOutlined />
                <span>+84 123 456 789</span>
              </div>
              <div className="contact-item">
                <EnvironmentOutlined />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </Space>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Text style={{ color: 'rgba(255,255,255,0.6)' }}>© 2025 Langleague. All rights reserved.</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
