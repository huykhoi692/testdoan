import React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFinish = (values: any) => {
    console.log('Register attempt:', values);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: '#ffffff',
        flexDirection: windowWidth <= 768 ? 'column' : 'row',
      }}
    >
      <div
        style={{
          flex: windowWidth <= 768 ? 'none' : '0 0 50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: windowWidth <= 480 ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: windowWidth <= 768 ? '40px 20px' : '60px',
          position: 'relative',
          minHeight: windowWidth <= 768 ? '200px' : 'auto',
        }}
      >
        <div style={{ maxWidth: '480px', width: '100%' }}>
          <img
            src="content/images/Langleague.jpg"
            alt="Students signing up"
            style={{
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              marginBottom: windowWidth <= 768 ? '20px' : '40px',
              display: windowWidth <= 768 ? 'none' : 'block',
            }}
          />
          <Title
            level={2}
            style={{
              color: 'white',
              marginBottom: '16px',
              fontSize: windowWidth <= 768 ? '20px' : '28px',
              fontWeight: 600,
              textAlign: windowWidth <= 768 ? 'center' : 'left',
            }}
          >
            Join us and start your learning journey today
          </Title>
        </div>
      </div>

      <div
        style={{
          flex: windowWidth <= 768 ? 'none' : '0 0 50%',
          display: 'flex',
          flexDirection: 'column',
          padding: windowWidth <= 480 ? '30px 20px' : windowWidth <= 768 ? '40px 30px' : '60px 80px',
          background: '#ffffff',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: windowWidth <= 768 ? 32 : 48 }}>
          <Title level={2} style={{ marginBottom: 8, fontSize: windowWidth <= 768 ? '24px' : '32px', fontWeight: 600 }}>
            Sign Up
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1890ff', fontWeight: 500 }}>
              Log in
            </Link>
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Full Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input placeholder="Full Name" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Email address" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password placeholder="Password" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Confirm Password</span>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                background: '#1890ff',
                borderColor: '#1890ff',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              Sign Up
            </Button>
          </Form.Item>

          <Divider plain style={{ margin: '24px 0', fontSize: '14px', color: '#9ca3af' }}>
            Or continue with
          </Divider>

          <Space style={{ width: '100%', justifyContent: 'center' }} size={windowWidth <= 480 ? 'small' : 'middle'}>
            <Button
              icon={<FacebookOutlined style={{ fontSize: windowWidth <= 480 ? '18px' : '20px', color: '#1877f2' }} />}
              shape="circle"
              size={windowWidth <= 480 ? 'middle' : 'large'}
              style={{
                width: windowWidth <= 480 ? '40px' : '48px',
                height: windowWidth <= 480 ? '40px' : '48px',
                border: '1px solid #e5e7eb',
              }}
            />
            <Button
              icon={<GoogleOutlined style={{ fontSize: windowWidth <= 480 ? '18px' : '20px', color: '#ea4335' }} />}
              shape="circle"
              size={windowWidth <= 480 ? 'middle' : 'large'}
              style={{
                width: windowWidth <= 480 ? '40px' : '48px',
                height: windowWidth <= 480 ? '40px' : '48px',
                border: '1px solid #e5e7eb',
              }}
            />
            <Button
              icon={<InstagramOutlined style={{ fontSize: windowWidth <= 480 ? '18px' : '20px', color: '#e1306c' }} />}
              shape="circle"
              size={windowWidth <= 480 ? 'middle' : 'large'}
              style={{
                width: windowWidth <= 480 ? '40px' : '48px',
                height: windowWidth <= 480 ? '40px' : '48px',
                border: '1px solid #e5e7eb',
              }}
            />
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
