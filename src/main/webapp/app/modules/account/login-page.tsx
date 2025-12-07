import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Space, Divider, message } from 'antd';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined, ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/config/store';
import { authenticate } from 'app/shared/services/account.service';

const { Title, Text } = Typography;

interface CaptchaData {
  captchaImage: string;
  captchaId: string;
}

const LoginPage = () => {
  const { t } = useTranslation('login');
  const [form] = Form.useForm();
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadCaptcha = async () => {
    setIsLoadingCaptcha(true);
    try {
      const response = await fetch('/api/captcha');

      if (!response.ok) {
        console.log('Captcha API not available, using mock captcha');
        const mockCaptcha: CaptchaData = {
          captchaId: 'mock-' + Date.now(),
          captchaImage:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTMvMTNJ6e0NAAACcklEQVR4nO3dz2rCQBQF8JtY/AtqFcSlIuLD+P4P4MaFYncuXLhQbP1D1SRzXbhw4cJNyPQuJmQyk5nkJjnwO5BFIJnJz0xCMgmEEEIIIYQQQgghhBBCCCGEEEIIIcS/S5R+gdYppQpgkKYphBBFg263izRNoes6dF1HnufI8xzbtm3z0nVJc86haZp1kiRJ27ZNAKh934/jOE7SNI3SNE3iOE6SJEniOI7jOE7a973Y973f9/04juM0TeM4juM0TWMAaF0XANq2bQpASZJA0zQkSYI0TaHrOizLQpZlyPMcZVlWJUlSKaUqAFWapjUA1LZt67Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27b/m+d5nmma5nmel/V9X9f3fV3f93V939f1fV/X931d3/d1XddVXddVXddVXddVXddVXddVXddVXddVdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/X9X1f1/d9Xd/3dX3f1/V9X9f3fV3f93Vd11Vd11Vd11Vd11Vd11Vd11V13dd13dd13dd13dd13dd13dd13dd13dd13dd13dd13dd1nd93Xfd93Xfd93Xfd93Xfd93Xfd93Xfd93Xfd9Xdf3VV3fVV3fVV3fVV3fVV3fVd33dd33dd33dd33dd33dd33dd33dd33dd33dd33dd33df/0fd/3fd/3fd/3fd/3fd/3fd/3fd/3fV/X9VVd31Vd31Vd31Vd31Vd33Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xdd3XdV3XdV3XdV3XdV3XdV3XdV3XdV3XdX3f1/V9X9f3fV3f93V939f1fV/X931d3/d1fd/XdX1f1fVdVdd1VV3XVXX/n+d5XpbneSmlVJqmKQzDgGEYMAwDhmFACAFd12GaJkzThGmaEEIgiiJEUQRN06BpGnRdh67r0HUduq4jyzJkWYYsy5BlGbIsQ5qmSNMUaZoiTVMkSYIkSZAkCZIkQZIk0HUduq5D13XouY4sy5BlGbIsQ5qmSNMUaZoiSRIkSYIkSZAkCZIkQZIk0HUduq5D13XkSdJ+vw+lFIQQ0DQNmqZB0zRomgZN06DrOnRdh67rMAEIIYQQQgghhBBCCCGEEEIIIYQQ4u/5BbXh5sN9i7lsAAAAAElFTkSuQmCC',
        };
        setCaptchaData(mockCaptcha);
        form.setFieldValue('captchaAnswer', '');
        return;
      }

      const data: CaptchaData = await response.json();

      if (data && data.captchaId && data.captchaImage) {
        setCaptchaData(data);
        form.setFieldValue('captchaAnswer', '');
      } else {
        console.log('Invalid captcha data received');
        setCaptchaData(null);
      }
    } catch (err) {
      console.log('Captcha feature not available, using mock captcha', err);
      const mockCaptcha: CaptchaData = {
        captchaId: 'mock-' + Date.now(),
        captchaImage:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTMvMTNJ6e0NAAACcklEQVR4nO3dz2rCQBQF8JtY/AtqFcSlIuLD+P4P4MaFYncuXLhQbP1D1SRzXbhw4cJNyPQuJmQyk5nkJjnwO5BFIJnJz0xCMgmEEEIIIYQQQgghhBBCCCGEEEIIIcS/S5R+gdYppQpgkKYphBBFg263izRNoes6dF1HnufI8xzbtm3z0nVJc86haZp1kiRJ27ZNAKh934/jOE7SNI3SNE3iOE6SJEniOI7jOE7a973Y973f9/04juM0TeM4juM0TWMAaF0XANq2bQpASZJA0zQkSYI0TaHrOizLQpZlyPMcZVlWJUlSKaUqAFWapjUA1LZt67Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27Zt27b/m+d5nmma5nmel/V9X9f3fV3f93V939f1fV/X931d3/d1XddVXddVXddVXddVXddVXddVXddVdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/Xdd/X9X1f1/d9Xd/3dX3f1/V9X9f3fV3f93Vd11Vd11Vd11Vd11Vd11Vd11V13dd13dd13dd13dd13dd13dd13dd13dd13dd13dd13dd1nd93Xfd93Xfd93Xfd93Xfd93Xfd93Xfd93Xfd9Xdf3VV3fVV3fVV3fVV3fVV3fVd33dd33dd33dd33dd33dd33dd33dd33dd33dd33dd33df/0fd/3fd/3fd/3fd/3fd/3fd/3fd/3fV/X9VVd31Vd31Vd31Vd31Vd33Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xd13Xdd3XdV3XdV3XdV3XdV3XdV3XdV3XdV3XdX3f1/V9X9f3fV3f93V939f1fV/X931d3/d1fd/XdX1f1fVdVdd1VV3XVXX/n+d5XpbneSmlVJqmKQzDgGEYMAwDhmFACAFd12GaJkzThGmaEEIgiiJEUQRN06BpGnRdh67r0HUduq4jyzJkWYYsy5BlGbIsQ5qmSNMUaZoiTVMkSYIkSZAkCZIkQZIk0HUduq5D13XouY4sy5BlGbIsQ5qmSNMUaZoiSRIkSYIkSZAkCZIkQZIk0HUduq5D13XkSdJ+vw+lFIQQ0DQNmqZB0zRomgZN06DrOnRdh67rMAEIIYQQQgghhBBCCCGEEEIIIYQQ4u/5BbXh5sN9i7lsAAAAAElFTkSuQmCC',
      };
      setCaptchaData(mockCaptcha);
      form.setFieldValue('captchaAnswer', '');
    } finally {
      setIsLoadingCaptcha(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
    const interval = setInterval(loadCaptcha, 60000);
    return () => clearInterval(interval);
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Clear old tokens before login
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('jhi-authenticationToken');

      // Use account.service authenticate
      const result = await dispatch(
        authenticate({
          username: values.email,
          password: values.password,
          rememberMe: values.remember || false,
          captchaId: captchaData?.captchaId || '',
          captchaValue: values.captchaAnswer,
        }),
      ).unwrap();

      const token = result.id_token;
      console.log('JWT:', token);
      message.success(t('login.success'));

      localStorage.setItem('authToken', token);
      sessionStorage.setItem('jhi-authenticationToken', token);

      // Decode JWT to check user role
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const authorities = payload.auth || '';

      // Redirect based on role
      if (authorities.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else if (authorities.includes('ROLE_STAFF')) {
        navigate('/staff');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.detail || 'Invalid username, password or captcha.';
      message.error(errorMessage);
      if (captchaData) {
        loadCaptcha();
      }
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
          background: 'linear-gradient(135deg, #667eea 0%, #081edfff 100%)',
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
            alt="Students learning"
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
            {t('login.welcomeMessage')}
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
            {t('login.title')}
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>
            {t('login.newToLangleague')}{' '}
            <Link to="/register" style={{ color: '#1890ff', fontWeight: 500 }}>
              {t('login.signUp')}
            </Link>
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('login.email')}</span>}
            name="email"
            rules={[{ required: true, message: t('login.validation.emailRequired') }]}
          >
            <Input placeholder={t('login.email')} size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('login.password')}</span>}
            name="password"
            rules={[{ required: true, message: t('login.validation.passwordRequired') }]}
            style={{ marginBottom: '12px' }}
          >
            <Input.Password placeholder={t('login.password')} size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          {captchaData && (
            <Form.Item
              label={<span style={{ fontSize: '14px', fontWeight: 500 }}>{t('login.captcha')}</span>}
              style={{ marginBottom: '16px' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    flex: 1,
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    padding: '8px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60px',
                  }}
                >
                  {isLoadingCaptcha ? (
                    <span style={{ color: '#999' }}>{t('common.loading')}</span>
                  ) : (
                    <img src={captchaData.captchaImage} alt="Captcha" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                  )}
                </div>
                <Button icon={<ReloadOutlined />} onClick={loadCaptcha} size="large" style={{ height: '48px' }} loading={isLoadingCaptcha}>
                  {t('login.refreshCaptcha')}
                </Button>
              </div>
              <Form.Item
                name="captchaAnswer"
                rules={[{ required: true, message: t('login.validation.captchaRequired') }]}
                style={{ marginTop: '12px', marginBottom: 0 }}
              >
                <Input placeholder={t('login.captcha')} size="large" style={{ height: '48px', fontSize: '15px' }} />
              </Form.Item>
            </Form.Item>
          )}

          <Form.Item style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontSize: '14px' }}>{t('login.rememberMe')}</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" style={{ fontSize: '14px', color: '#1890ff' }}>
                {t('login.forgotPassword')}
              </Link>
            </div>
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
              {t('login.loginButton')}
            </Button>
          </Form.Item>

          <Divider plain style={{ margin: '24px 0', fontSize: '14px', color: '#9ca3af' }}>
            {t('login.orContinueWith')}
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

export default LoginPage;
