import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Card, Progress } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const PasswordResetFinish = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const resetKey = searchParams.get('key');
    if (!resetKey) {
      setError('No reset key provided. Please use the link from your email.');
    } else {
      setKey(resetKey);
    }
  }, [searchParams]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = (): string => {
    if (passwordStrength < 40) return '#ff4d4f';
    if (passwordStrength < 70) return '#faad14';
    return '#52c41a';
  };

  const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
    if (!key) {
      setError('Invalid reset key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/account/reset-password/finish', {
        key,
        newPassword: values.newPassword,
      });
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.response?.data?.detail || 'Failed to reset password. The reset link may be invalid or expired.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a', marginBottom: '24px' }} />
          <Title level={2} style={{ marginBottom: 16 }}>
            Password Reset Successful!
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d', display: 'block', marginBottom: 24 }}>
            Your password has been successfully reset. You will be redirected to the login page shortly.
          </Text>
          <Link to="/login">
            <Button type="primary" size="large">
              Go to Login Now
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

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
            Set New Password
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>Please enter your new password below.</Text>
        </div>

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
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>New Password</span>}
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and numbers!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Enter new password"
              size="large"
              style={{ height: '48px', fontSize: '15px' }}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          {passwordStrength > 0 && (
            <div style={{ marginTop: '-16px', marginBottom: '16px' }}>
              <Progress percent={passwordStrength} strokeColor={getPasswordStrengthColor()} showInfo={false} size="small" />
              <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                Password strength: {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Medium' : 'Strong'}
              </Text>
            </div>
          )}

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Confirm Password</span>}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Confirm new password"
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
              disabled={!key}
              style={{
                background: '#1890ff',
                borderColor: '#1890ff',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '6px',
              }}
            >
              Reset Password
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ fontSize: '14px', color: '#1890ff', fontWeight: 500 }}>
              Back to Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetFinish;
