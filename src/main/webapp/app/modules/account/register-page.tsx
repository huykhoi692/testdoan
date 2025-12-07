import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Space, Divider, message } from 'antd';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/config/store';
import { register } from 'app/shared/services/account.service';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const { t } = useTranslation('register');
  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Call register API
      await dispatch(
        register({
          login: values.email,
          email: values.email,
          password: values.password,
          firstName: values.name.split(' ')[0] || values.name,
          lastName: values.name.split(' ').slice(1).join(' ') || '',
          langKey: 'vi',
        }),
      ).unwrap();

      message.success(t('register.success'));

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMsg = error?.message || 'Registration failed. Please try again.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
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
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600"
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
            {t('register.welcomeMessage')}
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
            {t('register.title')}
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>
            {t('register.haveAccount')}{' '}
            <Link to="/login" style={{ color: '#1890ff', fontWeight: 500 }}>
              {t('register.logIn')}
            </Link>
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('register.name')}</span>}
            name="name"
            rules={[{ required: true, message: t('register.validation.nameRequired') }]}
          >
            <Input placeholder={t('register.name')} size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('register.email')}</span>}
            name="email"
            rules={[
              { required: true, message: t('register.validation.emailRequired') },
              { type: 'email', message: t('register.validation.emailInvalid') },
            ]}
          >
            <Input placeholder={t('register.email')} size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('register.password')}</span>}
            name="password"
            rules={[
              { required: true, message: t('register.validation.passwordRequired') },
              { min: 8, message: t('register.validation.passwordMin') },
            ]}
          >
            <Input.Password placeholder="Password" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('register.confirmPassword')}</span>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t('register.validation.confirmRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('register.validation.passwordMatch')));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('register.confirmPassword')} size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
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
              {t('register.registerButton')}
            </Button>
          </Form.Item>

          <Divider plain style={{ margin: '24px 0', fontSize: '14px', color: '#9ca3af' }}>
            {t('register.orContinueWith')}
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
