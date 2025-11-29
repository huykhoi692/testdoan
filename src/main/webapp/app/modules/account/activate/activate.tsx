import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Result, Button, Spin, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const Activate = () => {
  const [searchParams] = useSearchParams();
  const [activationStatus, setActivationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const activationKey = searchParams.get('key');

    if (!activationKey) {
      setActivationStatus('error');
      setErrorMessage('No activation key provided');
      return;
    }

    // Call activation API
    const activateAccount = async () => {
      try {
        await axios.get(`/api/activate?key=${activationKey}`);
        setActivationStatus('success');
      } catch (error: any) {
        console.error('Activation error:', error);
        setActivationStatus('error');
        if (error.response?.status === 500) {
          setErrorMessage('Activation key is invalid or has expired. Please register again.');
        } else {
          setErrorMessage('Failed to activate account. Please try again or contact support.');
        }
      }
    };

    activateAccount();
  }, [searchParams]);

  if (activationStatus === 'loading') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '60px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          <Spin size="large" />
          <Title level={3} style={{ marginTop: '24px', marginBottom: '8px' }}>
            Activating Your Account
          </Title>
          <Paragraph style={{ color: '#666' }}>Please wait while we activate your account...</Paragraph>
        </div>
      </div>
    );
  }

  if (activationStatus === 'success') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '60px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          <Result
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            title="Account Activated Successfully!"
            subTitle="Your account has been activated. You can now log in and start your learning journey."
            extra={[
              <Link to="/login" key="login">
                <Button type="primary" size="large" style={{ height: '48px', fontSize: '16px', fontWeight: 600 }}>
                  Go to Login
                </Button>
              </Link>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '60px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        <Result
          icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          title="Activation Failed"
          subTitle={errorMessage || 'Unable to activate your account. Please try again.'}
          extra={[
            <Link to="/register" key="register">
              <Button type="primary" size="large" style={{ height: '48px', fontSize: '16px', fontWeight: 600, marginRight: '12px' }}>
                Register Again
              </Button>
            </Link>,
            <Link to="/login" key="login">
              <Button size="large" style={{ height: '48px', fontSize: '16px' }}>
                Back to Login
              </Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};

export default Activate;
