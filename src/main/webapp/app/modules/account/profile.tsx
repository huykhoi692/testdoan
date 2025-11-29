import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Space, Avatar, Button, Form, Input, Upload, message, Divider, Tag, Spin } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
  CameraOutlined,
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios from 'axios';
import { useAppSelector } from 'app/config/store';

const { Title, Text, Paragraph } = Typography;

interface IUserData {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  imageUrl?: string;
  joinDate?: string;
  level?: string;
  totalPoints?: number;
  coursesCompleted?: number;
  studyHours?: number;
  currentStreak?: number;
  badges?: Array<{ id: number; name: string; icon: string; description: string }>;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const account = useAppSelector(state => state.authentication.account);

  // User data from API
  const [userData, setUserData] = useState<IUserData>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    imageUrl: 'content/images/jhipster_family_member_0_head-256.png',
    joinDate: 'N/A',
    level: 'Beginner',
    totalPoints: 0,
    coursesCompleted: 0,
    studyHours: 0,
    currentStreak: 0,
    badges: [],
  });

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      try {
        setDataLoading(true);
        const response = await axios.get('/api/account');
        const accountData = response.data;

        // Map API response to userData
        const mappedData: IUserData = {
          id: accountData.id,
          firstName: accountData.firstName || '',
          lastName: accountData.lastName || '',
          email: accountData.email || '',
          phone: accountData.phone || '',
          location: accountData.location || '',
          bio: accountData.bio || '',
          imageUrl: accountData.imageUrl || 'content/images/jhipster_family_member_0_head-256.png',
          joinDate: accountData.createdDate
            ? new Date(accountData.createdDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'N/A',
          level: accountData.level || 'Beginner',
          totalPoints: accountData.totalPoints || 0,
          coursesCompleted: accountData.coursesCompleted || 0,
          studyHours: accountData.studyHours || 0,
          currentStreak: accountData.currentStreak || 0,
          badges: accountData.badges || [],
        };

        setUserData(mappedData);

        // Update form with current values
        form.setFieldsValue({
          firstName: mappedData.firstName,
          lastName: mappedData.lastName,
          email: mappedData.email,
          phone: mappedData.phone,
          location: mappedData.location,
          bio: mappedData.bio,
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        message.error('Failed to load profile data');
      } finally {
        setDataLoading(false);
      }
    };

    fetchUserProfile();
  }, [form]);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Call API to update profile - email should NOT be changed
      await axios.post('/api/account', {
        id: userData.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: userData.email, // Keep original email, don't allow changes
        langKey: account.langKey || 'en',
        imageUrl: userData.imageUrl,
      });

      // If phone, location, or bio are provided, update AppUser profile
      if (values.phone || values.location || values.bio) {
        await axios.put('/api/account/profile', {
          displayName: `${values.firstName} ${values.lastName}`.trim(),
          bio: values.bio || '',
        });
      }

      // Update local state
      setUserData({
        ...userData,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        location: values.location,
        bio: values.bio,
      });

      message.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }

      // Convert to base64 and upload to server
      const reader = new FileReader();
      reader.onload = async e => {
        const base64String = e.target?.result as string;
        try {
          await axios.put('/api/account/avatar', base64String, {
            headers: { 'Content-Type': 'text/plain' },
          });
          setUserData({
            ...userData,
            imageUrl: base64String,
          });
          message.success('Avatar updated successfully!');
        } catch (error) {
          console.error('Failed to update avatar:', error);
          message.error('Failed to update avatar');
        }
      };
      reader.readAsDataURL(file);

      return false; // Prevent auto upload
    },
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ marginBottom: '8px' }}>
          My Profile
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '16px', marginBottom: 0 }}>
          Manage your account information and learning preferences
        </Paragraph>
      </div>

      {dataLoading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin size="large" tip="Loading profile data..." />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {/* Left Column - Profile Info */}
          <Col xs={24} lg={16}>
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              title="Personal Information"
              extra={
                !editing && (
                  <Button type="link" icon={<EditOutlined />} onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                )
              }
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Avatar Section */}
                <div style={{ textAlign: 'center', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar size={120} src={userData.imageUrl} icon={<UserOutlined />} />
                    {editing && (
                      <Upload {...uploadProps} showUploadList={false}>
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<CameraOutlined />}
                          size="large"
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            border: '3px solid white',
                          }}
                        />
                      </Upload>
                    )}
                  </div>
                  <Title level={3} style={{ marginTop: '16px', marginBottom: '4px' }}>
                    {`${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User'}
                  </Title>
                  <Tag color="blue" style={{ fontSize: '14px' }}>
                    {userData.level} Learner
                  </Tag>
                  <div style={{ marginTop: '8px' }}>
                    <Text type="secondary">Member since {userData.joinDate}</Text>
                  </div>
                </div>

                {/* Form */}
                <Form form={form} layout="vertical" onFinish={handleSave} disabled={!editing} style={{ marginTop: '16px' }}>
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Your first name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Your last name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                        tooltip="Email cannot be changed"
                      >
                        <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Phone" name="phone">
                        <Input prefix={<PhoneOutlined />} placeholder="+84 123 456 789" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Location" name="location">
                        <Input prefix={<EnvironmentOutlined />} placeholder="City, Country" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Bio" name="bio">
                        <Input.TextArea
                          rows={4}
                          placeholder="Tell us about yourself and your language learning goals..."
                          maxLength={200}
                          showCount
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {editing && (
                    <div style={{ textAlign: 'right', marginTop: '16px' }}>
                      <Space>
                        <Button onClick={() => setEditing(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                          Save Changes
                        </Button>
                      </Space>
                    </div>
                  )}
                </Form>
              </Space>
            </Card>
          </Col>

          {/* Right Column - Stats & Badges */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Stats Card */}
              <Card style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} title="Learning Stats">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <TrophyOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                      <div>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          Total Points
                        </Text>
                        <Text strong style={{ fontSize: '18px' }}>
                          {userData.totalPoints}
                        </Text>
                      </div>
                    </Space>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <BookOutlined style={{ fontSize: '24px', color: '#667eea' }} />
                      <div>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          Courses Completed
                        </Text>
                        <Text strong style={{ fontSize: '18px' }}>
                          {userData.coursesCompleted}
                        </Text>
                      </div>
                    </Space>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <ClockCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                      <div>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          Study Hours
                        </Text>
                        <Text strong style={{ fontSize: '18px' }}>
                          {userData.studyHours}h
                        </Text>
                      </div>
                    </Space>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <FireOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                      <div>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          Current Streak
                        </Text>
                        <Text strong style={{ fontSize: '18px' }}>
                          {userData.currentStreak} days
                        </Text>
                      </div>
                    </Space>
                  </div>
                </Space>
              </Card>

              {/* Badges Card */}
              <Card style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} title="Achievements">
                <Row gutter={[12, 12]}>
                  {userData.badges.map(badge => (
                    <Col xs={12} key={badge.id}>
                      <Card
                        hoverable
                        style={{
                          textAlign: 'center',
                          borderRadius: '12px',
                          border: '1px solid #f0f0f0',
                          background: 'linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%)',
                        }}
                        styles={{ body: { padding: '16px 8px' } }}
                      >
                        <div style={{ fontSize: '36px', marginBottom: '8px' }}>{badge.icon}</div>
                        <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                          {badge.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {badge.description}
                        </Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Profile;
