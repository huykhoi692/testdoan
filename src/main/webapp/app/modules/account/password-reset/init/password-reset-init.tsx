import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const PasswordResetInit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/account/reset-password/init', values.email, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      setSuccess(true);
      form.resetFields();
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <Title level={2} style={{ marginBottom: 8, fontSize: '28px', fontWeight: 600 }}>
            Reset Password
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </div>

        {success && (
          <Alert
            message="Check your email"
            description="We've sent you an email with instructions to reset your password. Please check your inbox."
            type="success"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 24 }}
          />
        )}

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Email Address</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Enter your email address"
              size="large"
              style={{ height: '48px', fontSize: '15px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                background: '#1890ff',
                borderColor: '#1890ff',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ fontSize: '14px', color: '#1890ff', fontWeight: 500 }}>
              <ArrowLeftOutlined style={{ marginRight: '8px' }} />
              Back to Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetInit;
