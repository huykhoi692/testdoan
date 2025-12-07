import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Typography, Upload, Avatar, Spin } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/config/store';
import { getAccount, updateAccount, updateAvatar } from 'app/shared/services/account.service';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

const MyProfile: React.FC = () => {
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setFetchingProfile(true);
    try {
      const profile = await dispatch(getAccount()).unwrap();

      // Set form values
      form.setFieldsValue({
        fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        displayName: profile.displayName,
      });

      if (profile.imageUrl) {
        setAvatarUrl(profile.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error(t('profile.loadError'));
    } finally {
      setFetchingProfile(false);
    }
  };

  const handleAvatarChange = async (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    const file = info.file.originFileObj || info.file;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await dispatch(updateAvatar(formData)).unwrap();

      if (result.imageUrl) {
        setAvatarUrl(result.imageUrl);
        message.success(t('profile.avatarUploadSuccess'));
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      message.error(t('profile.avatarUploadError'));
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const names = values.fullName?.split(' ') || [];
      const updateData = {
        firstName: names[0] || values.firstName,
        lastName: names.slice(1).join(' ') || values.lastName,
        email: values.email,
        displayName: values.displayName,
      };

      await dispatch(updateAccount(updateData)).unwrap();
      message.success(t('profile.updateSuccess'));
      await fetchProfile(); // Refresh profile data
    } catch (error: any) {
      console.error('Error updating profile:', error);
      message.error(error?.message || t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', padding: '40px' }}>
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          background: '#ffffff',
          padding: '48px',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Title level={2} style={{ color: '#4169e1', marginBottom: 32, fontSize: 28 }}>
          {t('profile.title')}
        </Title>

        {fetchingProfile ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: 16, color: '#999' }}>{t('common.loading')}</div>
          </div>
        ) : (
          <>
            {/* Avatar Upload */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <Avatar size={120} src={avatarUrl} icon={!avatarUrl && <UserOutlined />} style={{ marginBottom: 16 }} />
              <div>
                <Upload accept="image/*" showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
                  <Button icon={<UploadOutlined />} loading={loading}>
                    {t('profile.uploadAvatar')}
                  </Button>
                </Upload>
              </div>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{t('profile.fullName')}</Text>}
                name="fullName"
                rules={[{ required: true, message: t('profile.fullNamePlaceholder') }]}
              >
                <Input size="large" placeholder={t('profile.fullNamePlaceholder')} style={{ borderRadius: 8 }} />
              </Form.Item>

              <Form.Item
                label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{t('profile.email')}</Text>}
                name="email"
                rules={[
                  { required: true, message: t('profile.email') },
                  { type: 'email', message: t('register.validation.emailInvalid') },
                ]}
              >
                <Input size="large" placeholder="email@example.com" style={{ borderRadius: 8 }} />
              </Form.Item>

              <Form.Item label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{t('profile.gender')}</Text>} name="gender">
                <Select size="large" placeholder={t('profile.gender')} style={{ borderRadius: 8 }}>
                  <Option value="Nam">{t('profile.male')}</Option>
                  <Option value="Nữ">{t('profile.female')}</Option>
                  <Option value="Khác">{t('profile.other')}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{t('profile.birthDate')}</Text>}
                name="birthDate"
              >
                <DatePicker size="large" format="DD/MM/YYYY" placeholder="21/1/2000" style={{ width: '100%', borderRadius: 8 }} />
              </Form.Item>

              <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{
                    minWidth: 120,
                    height: 44,
                    borderRadius: 8,
                    background: '#4169e1',
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  {t('profile.save')}
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
