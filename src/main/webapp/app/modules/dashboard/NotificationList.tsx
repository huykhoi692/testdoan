import React, { useEffect } from 'react';
import { List, Card, Typography, Badge, Empty, Spin, Button } from 'antd';
import { BellOutlined, CheckOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getMyNotifications, markNotificationAsRead } from 'app/shared/services/notification.service';
import DashboardLayout from 'app/shared/layout/dashboard-layout';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const NotificationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.notification.notifications);
  const loading = useAppSelector(state => state.notification.loading);

  useEffect(() => {
    dispatch(getMyNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id: number) => {
    dispatch(markNotificationAsRead(id));
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'REMINDER':
        return '#1890ff';
      case 'ANNOUNCEMENT':
        return '#52c41a';
      case 'ACHIEVEMENT':
        return '#faad14';
      default:
        return '#666';
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'REMINDER':
        return 'Nhắc nhở';
      case 'ANNOUNCEMENT':
        return 'Thông báo';
      case 'ACHIEVEMENT':
        return 'Thành tích';
      default:
        return 'Thông báo';
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <BellOutlined style={{ fontSize: 24, color: '#667eea', marginRight: 12 }} />
            <Title level={3} style={{ margin: 0, color: '#667eea' }}>
              Thông báo
            </Title>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size="large" />
            </div>
          ) : notifications.length === 0 ? (
            <Empty description="Không có thông báo nào" />
          ) : (
            <List
              dataSource={notifications}
              renderItem={item => (
                <List.Item
                  style={{
                    padding: '16px',
                    background: item.read ? '#fff' : '#f0f5ff',
                    borderRadius: 8,
                    marginBottom: 12,
                    border: item.read ? '1px solid #f0f0f0' : '1px solid #d6e4ff',
                  }}
                  actions={[
                    !item.read && (
                      <Button
                        type="link"
                        size="small"
                        icon={<CheckOutlined />}
                        onClick={() => handleMarkAsRead(item.id)}
                        style={{ color: '#667eea' }}
                      >
                        Đánh dấu đã đọc
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Badge color={getNotificationTypeColor(item.type || '')} />
                        <Text strong style={{ fontSize: 14 }}>
                          {item.title}
                        </Text>
                        {!item.read && (
                          <Badge
                            count="Mới"
                            style={{
                              backgroundColor: '#667eea',
                              fontSize: 10,
                              height: 18,
                              lineHeight: '18px',
                            }}
                          />
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <Text style={{ display: 'block', marginTop: 8 }}>{item.message}</Text>
                        <div style={{ marginTop: 8, display: 'flex', gap: 16, fontSize: 12, color: '#999' }}>
                          <span>{getNotificationTypeLabel(item.type || '')}</span>
                          <span>•</span>
                          <span>{dayjs(item.createdAt).fromNow()}</span>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotificationList;
