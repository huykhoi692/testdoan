import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Typography, Divider, message, Switch } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [dailyNotifications, setDailyNotifications] = useState(true);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Form values:', values);

    setTimeout(() => {
      setLoading(false);
      message.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div style={{ padding: '32px' }}>
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <Title level={3} style={{ color: '#667eea', marginBottom: 32 }}>
          Account Information
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            username: 'Dung Hang',
            email: 'dunghang@gmail.com',
            phone: '0123456789',
            language: 'en',
          }}
        >
          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Username</Text>}
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#999' }} />}
              size="large"
              placeholder="Enter username"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Email</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: '#999' }} />} size="large" placeholder="Enter email" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Phone number</Text>}
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: '#999' }} />}
              size="large"
              placeholder="Enter phone number"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Divider />

          <Title level={4} style={{ fontSize: 16, marginBottom: 24 }}>
            Change password
          </Title>

          <Form.Item label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Current password</Text>} name="currentPassword">
            <Input.Password
              prefix={<LockOutlined style={{ color: '#999' }} />}
              size="large"
              placeholder="Enter current password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500 }}>New password</Text>}
            name="newPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Password must be at least 6 characters'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#999' }} />}
              size="large"
              placeholder="Enter new password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Re-enter new password</Text>}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#999' }} />}
              size="large"
              placeholder="Re-enter new password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item label={<Text style={{ fontSize: 14, fontWeight: 500 }}>Interface language</Text>} name="language">
            <Select size="large" style={{ borderRadius: 8 }}>
              <Option value="en">English (UK)</Option>
              <Option value="vn">Tiếng Việt</Option>
              <Option value="es">Español</Option>
              <Option value="fr">Français</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Title level={4} style={{ fontSize: 16, marginBottom: 24 }}>
            Thông báo
          </Title>

          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 500 }}>Bật thông báo</Text>
              <Switch
                checked={enableNotifications}
                onChange={setEnableNotifications}
                style={{
                  backgroundColor: enableNotifications ? '#52c41a' : '#d9d9d9',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: 500 }}>Thông báo hàng ngày</Text>
              <Switch
                checked={dailyNotifications}
                onChange={setDailyNotifications}
                style={{
                  backgroundColor: dailyNotifications ? '#52c41a' : '#d9d9d9',
                }}
              />
            </div>
          </div>

          <Form.Item style={{ marginTop: 32, marginBottom: 0, textAlign: 'right' }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{
                background: '#667eea',
                borderColor: '#667eea',
                borderRadius: 8,
                padding: '0 48px',
                height: 44,
                fontWeight: 500,
              }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
