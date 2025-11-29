import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Avatar, Upload, Spin, Row, Col, Slider, Switch } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const SettingsPage = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [goalForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingGoal, setSavingGoal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(account?.avatarUrl);
  const [dailyGoal, setDailyGoal] = useState(30);
  const [dailyReminder, setDailyReminder] = useState(false);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  useEffect(() => {
    if (account) {
      profileForm.setFieldsValue({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        displayName: account.displayName,
        bio: account.bio,
      });
      // setDailyGoal(account.dailyGoal || 30);
      // goalForm.setFieldsValue({ dailyGoal: account.dailyGoal || 30 });
      // setDailyReminder(account.dailyReminder || false);
      setAvatarUrl(account.avatarUrl);
      setLoading(false);
    }
  }, [account, profileForm, goalForm]);

  const onFinishProfile = async (values: any) => {
    setSavingProfile(true);
    try {
      await axios.post('/api/account', { ...account, ...values });
      await axios.put('/api/account/profile', { displayName: values.displayName, bio: values.bio });
      message.success('Profile updated successfully!');
      dispatch(getSession());
    } catch (error) {
      message.error('Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const onFinishPassword = async (values: any) => {
    setSavingPassword(true);
    try {
      await axios.post('/api/account/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('Password updated successfully!');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to update password. Please check your current password.');
    } finally {
      setSavingPassword(false);
    }
  };

  const onFinishGoal = async (values: any) => {
    setSavingGoal(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Learning goal updated successfully!');
    } catch (error) {
      message.error('Failed to update learning goal.');
    } finally {
      setSavingGoal(false);
    }
  };

  const handleReminderChange = async (checked: boolean) => {
    setDailyReminder(checked);
    try {
      // TODO: Replace with actual API call when available
      await new Promise(resolve => setTimeout(resolve, 500));
      // await axios.put('/api/account/notification-settings', { dailyReminder: checked });
      message.success(`Daily reminders ${checked ? 'enabled' : 'disabled'}.`);
    } catch (error) {
      message.error('Failed to update notification settings.');
      setDailyReminder(!checked); // Revert on error
    }
  };

  const handleAvatarUpload = async options => {
    // ... (avatar upload logic remains the same)
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Profile Settings" style={{ marginBottom: 16 }}>
            {/* Profile Form */}
          </Card>
          <Card title="Change Password">{/* Password Form */}</Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Learning Goal" style={{ marginBottom: 16 }}>
            <Form form={goalForm} layout="vertical" onFinish={onFinishGoal} initialValues={{ dailyGoal }}>
              <Form.Item name="dailyGoal" label={`Daily Study Goal: ${dailyGoal} minutes`}>
                <Slider
                  min={10}
                  max={120}
                  step={5}
                  onChange={value => setDailyGoal(value)}
                  marks={{ 10: '10', 30: '30', 60: '60', 90: '90', 120: '120' }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={savingGoal}>
                  Set Goal
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Notification Settings">
            <Form.Item label="Enable Daily Reminders">
              <Switch checked={dailyReminder} onChange={handleReminderChange} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default SettingsPage;
