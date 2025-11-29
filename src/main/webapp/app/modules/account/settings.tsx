import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Switch, Select, Button, Form, Divider, message, Radio } from 'antd';
import {
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  SoundOutlined,
  EyeOutlined,
  MobileOutlined,
  MailOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Mock settings - replace with actual API call
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    lessonReminders: true,
    weeklyReports: true,
    achievementAlerts: true,

    // Learning Preferences
    language: 'en',
    difficulty: 'intermediate',
    dailyGoal: 30,
    autoPlayAudio: true,
    showTranslations: true,

    // Privacy
    profileVisibility: 'public',
    showProgress: true,
    allowMessages: true,

    // Accessibility
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();

      // TODO: Call API to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setSettings({ ...settings, ...values });
      message.success('Settings saved successfully!');
    } catch (error) {
      message.error('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Settings reset to previous values');
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>
          Settings
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '16px', marginBottom: 0 }}>
          Customize your learning experience and preferences
        </Paragraph>
      </div>

      <Form form={form} layout="vertical" initialValues={settings} onFinish={handleSave}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Notifications Settings */}
          <Card
            title={
              <Space>
                <BellOutlined />
                <span>Notifications</span>
              </Space>
            }
            style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text strong>Email Notifications</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Receive updates and news via email
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Form.Item name="emailNotifications" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '8px 0' }} />

              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text strong>Push Notifications</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Get instant notifications on your device
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Form.Item name="pushNotifications" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '8px 0' }} />

              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text strong>Lesson Reminders</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Daily reminders to practice your lessons
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Form.Item name="lessonReminders" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '8px 0' }} />

              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text strong>Weekly Progress Reports</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Summary of your learning progress each week
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Form.Item name="weeklyReports" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '8px 0' }} />

              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={0}>
                    <Text strong>Achievement Alerts</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Celebrate when you earn new badges
                    </Text>
                  </Space>
                </Col>
                <Col>
                  <Form.Item name="achievementAlerts" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Space>
          </Card>

          {/* Learning Preferences */}
          <Card
            title={
              <Space>
                <GlobalOutlined />
                <span>Learning Preferences</span>
              </Space>
            }
            style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Form.Item label="Interface Language" name="language">
                  <Select size="large">
                    <Option value="en">English</Option>
                    <Option value="vi">Tiếng Việt</Option>
                    <Option value="ko">한국어 (Korean)</Option>
                    <Option value="ja">日本語 (Japanese)</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Default Difficulty" name="difficulty">
                  <Select size="large">
                    <Option value="beginner">Beginner</Option>
                    <Option value="intermediate">Intermediate</Option>
                    <Option value="advanced">Advanced</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Daily Goal (minutes)" name="dailyGoal">
                  <Select size="large">
                    <Option value={15}>15 minutes</Option>
                    <Option value={30}>30 minutes</Option>
                    <Option value={45}>45 minutes</Option>
                    <Option value={60}>60 minutes</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Space direction="vertical" size={0} style={{ width: '100%', paddingTop: '30px' }}>
                  <Row justify="space-between" align="middle">
                    <Text strong>Auto-play Audio</Text>
                    <Form.Item name="autoPlayAudio" valuePropName="checked" style={{ margin: 0 }}>
                      <Switch />
                    </Form.Item>
                  </Row>
                </Space>
              </Col>

              <Col xs={24}>
                <Row justify="space-between" align="middle">
                  <Space direction="vertical" size={0}>
                    <Text strong>Show Translations</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Display translations by default in lessons
                    </Text>
                  </Space>
                  <Form.Item name="showTranslations" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Privacy Settings */}
          <Card
            title={
              <Space>
                <LockOutlined />
                <span>Privacy & Security</span>
              </Space>
            }
            style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                  Profile Visibility
                </Text>
                <Form.Item name="profileVisibility" style={{ margin: 0 }}>
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="public">Public - Anyone can see your profile</Radio>
                      <Radio value="friends">Friends only - Only your connections can see</Radio>
                      <Radio value="private">Private - Only you can see your profile</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Divider />

              <Row justify="space-between" align="middle">
                <Space direction="vertical" size={0}>
                  <Text strong>Show Learning Progress</Text>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Display your progress on your profile
                  </Text>
                </Space>
                <Form.Item name="showProgress" valuePropName="checked" style={{ margin: 0 }}>
                  <Switch />
                </Form.Item>
              </Row>

              <Divider style={{ margin: '8px 0' }} />

              <Row justify="space-between" align="middle">
                <Space direction="vertical" size={0}>
                  <Text strong>Allow Direct Messages</Text>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Let other users send you messages
                  </Text>
                </Space>
                <Form.Item name="allowMessages" valuePropName="checked" style={{ margin: 0 }}>
                  <Switch />
                </Form.Item>
              </Row>
            </Space>
          </Card>

          {/* Accessibility Settings */}
          <Card
            title={
              <Space>
                <EyeOutlined />
                <span>Accessibility</span>
              </Space>
            }
            style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Form.Item label="Font Size" name="fontSize">
                  <Select size="large">
                    <Option value="small">Small</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="large">Large</Option>
                    <Option value="xlarge">Extra Large</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Space direction="vertical" size={0} style={{ width: '100%', paddingTop: '30px' }}>
                  <Row justify="space-between" align="middle">
                    <Text strong>High Contrast Mode</Text>
                    <Form.Item name="highContrast" valuePropName="checked" style={{ margin: 0 }}>
                      <Switch />
                    </Form.Item>
                  </Row>
                </Space>
              </Col>

              <Col xs={24}>
                <Row justify="space-between" align="middle">
                  <Space direction="vertical" size={0}>
                    <Text strong>Reduced Motion</Text>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Minimize animations and transitions
                    </Text>
                  </Space>
                  <Form.Item name="reducedMotion" valuePropName="checked" style={{ margin: 0 }}>
                    <Switch />
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Action Buttons */}
          <Card style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Text type="secondary">Changes will be saved automatically</Text>
              </Col>
              <Col>
                <Space>
                  <Button size="large" onClick={handleReset}>
                    Reset
                  </Button>
                  <Button type="primary" size="large" htmlType="submit" loading={loading}>
                    Save Settings
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Form>
    </div>
  );
};

export default Settings;
