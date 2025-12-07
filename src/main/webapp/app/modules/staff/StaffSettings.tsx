import React, { useState, useEffect } from 'react';
import { useTranslation } from 'app/shared/utils/useTranslation';
import { Card, Form, Input, Button, Switch, message, Typography, Space, Divider, Avatar, Upload } from 'antd';
import { SettingOutlined, UserOutlined, BellOutlined, LockOutlined, SaveOutlined, CameraOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface StaffSettings {
  name?: string;
  email?: string;
  notifications?: {
    emailNotifications?: boolean;
    newBookAlerts?: boolean;
    contentUpdates?: boolean;
  };
  profile?: {
    bio?: string;
    avatar?: string;
  };
}

const StaffSettings: React.FC = () => {
  const { t } = useTranslation('staff');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [settings, setSettings] = useState<StaffSettings>({
    notifications: {
      emailNotifications: true,
      newBookAlerts: true,
      contentUpdates: true,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await axios.get('/api/account');
      const accountData = response.data;

      setSettings({
        name: accountData.firstName + ' ' + accountData.lastName,
        email: accountData.email,
        notifications: {
          emailNotifications: true,
          newBookAlerts: true,
          contentUpdates: true,
        },
        profile: {
          bio: accountData.bio || '',
          avatar: accountData.imageUrl || '',
        },
      });

      setAvatarUrl(accountData.imageUrl || '');

      form.setFieldsValue({
        name: accountData.firstName + ' ' + accountData.lastName,
        email: accountData.email,
        bio: accountData.bio || '',
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSaveProfile = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('/api/account', {
        firstName: values.name?.split(' ')[0] || '',
        lastName: values.name?.split(' ').slice(1).join(' ') || '',
        email: values.email,
        imageUrl: avatarUrl,
        displayName: values.name || '',
        bio: values.bio || '',
      });

      message.success(t('settings.profileSaved'));
    } catch (error: any) {
      console.error('Error saving profile:', error);
      message.error(error.response?.data?.message || t('settings.profileSaveFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    setLoading(true);
    try {
      message.success(t('settings.notificationsSaved'));
    } catch (error) {
      message.error(t('settings.notificationsSaveFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error(t('settings.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/account/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success(t('settings.passwordChanged'));
      form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
    } catch (error: any) {
      console.error('Error changing password:', error);
      message.error(error.response?.data?.message || t('settings.passwordChangeFailed'));
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    showUploadList: false,
    async beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error(t('settings.imageOnly'));
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error(t('settings.imageTooLarge'));
        return false;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        // Use correct API endpoint /api/files/upload/avatar
        const response = await axios.post('/api/files/upload/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        // API returns { success: true, data: { fileUrl, fileName, ... }, message: "..." }
        const fileUrl = response.data.data?.fileUrl || response.data.url || '';
        setAvatarUrl(fileUrl);
        message.success(t('settings.avatarUploaded'));
      } catch (error) {
        message.error(t('settings.avatarUploadFailed'));
      }

      return false;
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <SettingOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
        {t('settings.title')}
      </Title>

      {/* Profile Settings */}
      <Card
        title={
          <Space>
            <UserOutlined />
            <Text strong>{t('settings.profileSettings')}</Text>
          </Space>
        }
        style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <div style={{ marginRight: '24px' }}>
            <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />
            <Upload {...uploadProps}>
              <Button icon={<CameraOutlined />} style={{ marginTop: '12px', width: '100px' }}>
                {t('settings.change')}
              </Button>
            </Upload>
          </div>
          <div style={{ flex: 1 }}>
            <Form form={form} layout="vertical" onFinish={handleSaveProfile}>
              <Form.Item label={t('profile.fullName')} name="name" rules={[{ required: true, message: t('settings.nameRequired') }]}>
                <Input placeholder={t('settings.enterFullName')} />
              </Form.Item>
              <Form.Item
                label={t('profile.email')}
                name="email"
                rules={[{ required: true, type: 'email', message: t('settings.emailInvalid') }]}
              >
                <Input placeholder={t('settings.enterEmail')} disabled />
              </Form.Item>
              <Form.Item label={t('profile.bio')} name="bio">
                <Input.TextArea rows={3} placeholder={t('settings.tellAboutYourself')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                  {t('settings.saveProfile')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card
        title={
          <Space>
            <BellOutlined />
            <Text strong>{t('settings.notificationSettings')}</Text>
          </Space>
        }
        style={{ marginBottom: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>{t('settings.emailNotifications')}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {t('settings.emailNotificationsDesc')}
              </Text>
            </div>
            <Switch
              checked={settings.notifications?.emailNotifications}
              onChange={checked =>
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, emailNotifications: checked },
                }))
              }
            />
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>{t('settings.newBookAlerts')}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {t('settings.newBookAlertsDesc')}
              </Text>
            </div>
            <Switch
              checked={settings.notifications?.newBookAlerts}
              onChange={checked =>
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, newBookAlerts: checked },
                }))
              }
            />
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>{t('settings.contentUpdates')}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {t('settings.contentUpdatesDesc')}
              </Text>
            </div>
            <Switch
              checked={settings.notifications?.contentUpdates}
              onChange={checked =>
                setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, contentUpdates: checked },
                }))
              }
            />
          </div>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveNotifications} loading={loading} style={{ marginTop: '12px' }}>
            {t('settings.saveNotifications')}
          </Button>
        </Space>
      </Card>

      {/* Security Settings */}
      <Card
        title={
          <Space>
            <LockOutlined />
            <Text strong>{t('settings.securitySettings')}</Text>
          </Space>
        }
        style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            label={t('settings.currentPassword')}
            name="currentPassword"
            rules={[{ required: true, message: t('settings.currentPasswordRequired') }]}
          >
            <Input.Password placeholder={t('settings.enterCurrentPassword')} />
          </Form.Item>
          <Form.Item
            label={t('settings.newPassword')}
            name="newPassword"
            rules={[{ required: true, min: 6, message: t('settings.passwordMinLength') }]}
          >
            <Input.Password placeholder={t('settings.enterNewPassword')} />
          </Form.Item>
          <Form.Item
            label={t('settings.confirmPassword')}
            name="confirmPassword"
            rules={[{ required: true, message: t('settings.confirmPasswordRequired') }]}
          >
            <Input.Password placeholder={t('settings.confirmNewPassword')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
              {t('settings.changePassword')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StaffSettings;
