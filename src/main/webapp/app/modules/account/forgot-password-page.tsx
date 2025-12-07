import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const { t } = useTranslation('password');
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFinish = (values: any) => {
    console.log('Reset password for:', values.email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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
            background: 'linear-gradient(135deg, #e41d8aff 0%, #f1c602ff 100%)',
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
              src="https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=600"
              alt="Check email"
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
              {t('forgotPassword.welcomeMessage')}
            </Title>
          </div>
        </div>

        <div
          style={{
            flex: windowWidth <= 768 ? 'none' : '0 0 50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: windowWidth <= 480 ? '30px 20px' : windowWidth <= 768 ? '40px 30px' : '60px 80px',
            background: '#ffffff',
          }}
        >
          <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title level={2} style={{ fontSize: windowWidth <= 768 ? '24px' : '32px', fontWeight: 600 }}>
                {t('forgotPassword.checkEmail')}
              </Title>
              <Text style={{ fontSize: '15px', color: '#6c757d' }}>{t('forgotPassword.checkEmailMessage')}</Text>
              <Link to="/login" style={{ width: '100%', display: 'block' }}>
                <Button
                  type="primary"
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
                  {t('forgotPassword.returnToLogin')}
                </Button>
              </Link>
            </Space>
          </div>
        </div>
      </div>
    );
  }

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
          background: 'linear-gradient(135deg, #e41d8aff 0%, #f1c602ff 100%)',
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
            src="https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=600"
            alt="Forgot password"
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
            {t('forgotPassword.welcomeMessage')}
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
            {t('forgotPassword.title')}
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>{t('forgotPassword.description')}</Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('forgotPassword.email')}</span>}
            name="email"
            rules={[
              { required: true, message: t('forgotPassword.email') + ' is required' },
              { type: 'email', message: t('forgotPassword.email') + ' is invalid' },
            ]}
          >
            <Input placeholder={t('forgotPassword.email')} size="large" style={{ height: '48px', fontSize: '15px' }} />
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
              {t('forgotPassword.sendLink')}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ fontSize: '14px', color: '#1890ff' }}>
              {t('forgotPassword.backToLogin')}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
