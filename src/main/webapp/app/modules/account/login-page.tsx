import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Space, Divider, message } from 'antd';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

interface CaptchaData {
  captchaImage: string;
  captchaId: string;
}

const LoginPage = () => {
  const [form] = Form.useForm();
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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
      // Validate captcha trước khi gửi request authenticate
      if (captchaData) {
        if (!values.captchaAnswer) {
          message.error({
            content: 'Please fill in the captcha code.',
            duration: 4,
            style: {
              marginTop: '20vh',
            },
          });
          setLoading(false);
          return;
        }
      }

      // Gửi request authenticate với captchaId và captchaValue
      const authResponse = await axios.post('/api/authenticate', {
        username: values.email,
        password: values.password,
        rememberMe: values.remember || false,
        captchaId: captchaData?.captchaId || '',
        captchaValue: values.captchaAnswer || '',
      });

      console.log('JWT:', authResponse.data.id_token);
      message.success({
        content: 'Login successful! Redirecting to dashboard...',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });

      localStorage.setItem('authToken', authResponse.data.id_token);
      sessionStorage.setItem('jhi-authenticationToken', authResponse.data.id_token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error', err);

      if (err.response?.status === 401) {
        message.error({
          content: 'Invalid email, password or captcha. Please check your credentials and try again.',
          duration: 5,
          style: {
            marginTop: '20vh',
          },
        });
      } else if (err.response?.status === 400) {
        const errorDetail = err.response?.data?.detail || '';
        if (errorDetail.includes('captcha')) {
          message.error({
            content: 'Invalid captcha. Please try again.',
            duration: 5,
            style: {
              marginTop: '20vh',
            },
          });
        } else {
          message.error({
            content: 'Login failed. Please check your information.',
            duration: 5,
            style: {
              marginTop: '20vh',
            },
          });
        }
      } else if (err.code === 'ERR_NETWORK') {
        message.error({
          content: 'Network error. Please check your internet connection.',
          duration: 5,
          style: {
            marginTop: '20vh',
          },
        });
      } else {
        message.error({
          content: 'Login failed. Please try again later.',
          duration: 5,
          style: {
            marginTop: '20vh',
          },
        });
      }

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
            Welcome, explore the way to learn faster
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
            Log in
          </Title>
          <Text style={{ fontSize: '15px', color: '#6c757d' }}>
            New to Langleague?{' '}
            <Link to="/register" style={{ color: '#1890ff', fontWeight: 500 }}>
              Sign Up
            </Link>
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Username</span>}
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '12px' }}
          >
            <Input.Password placeholder="Password" size="large" style={{ height: '48px', fontSize: '15px' }} />
          </Form.Item>

          <Form.Item label={<span style={{ fontSize: '14px', fontWeight: 500 }}>Captcha</span>} required>
            <div style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
              {captchaData ? (
                <img
                  src={captchaData.captchaImage}
                  alt="captcha"
                  onClick={loadCaptcha}
                  style={{
                    cursor: 'pointer',
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    height: '48px',
                    flex: 1,
                    backgroundColor: 'white',
                    padding: '0 12px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    height: '48px',
                    flex: 1,
                    backgroundColor: '#f5f5f5',
                    color: '#8c8c8c',
                    fontSize: '13px',
                  }}
                >
                  {isLoadingCaptcha ? 'Loading captcha...' : 'Captcha not available'}
                </div>
              )}
              <Button
                icon={<ReloadOutlined spin={isLoadingCaptcha} />}
                onClick={loadCaptcha}
                disabled={isLoadingCaptcha}
                size="large"
                title="Reload captcha"
                style={{ height: '48px', width: '48px' }}
              />
            </div>
            <Form.Item name="captchaAnswer" noStyle rules={[{ required: captchaData !== null, message: 'Please enter captcha!' }]}>
              <Input
                placeholder={captchaData ? 'Enter captcha' : 'Captcha loading...'}
                size="large"
                style={{ height: '48px', fontSize: '15px' }}
                disabled={!captchaData}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ fontSize: '14px' }}>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" style={{ fontSize: '14px', color: '#1890ff' }}>
                Forgot password?
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
              Log In
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

export default LoginPage;
