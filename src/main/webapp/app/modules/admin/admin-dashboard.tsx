import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Alert, Tag, Space, Spin, Progress } from 'antd';
import { UserOutlined, BookOutlined, FireOutlined, WarningOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { PageHeader } from 'app/shared/components/PageHeader';
import { StatCard } from 'app/shared/components/StatCard';
import type { ColumnsType } from 'antd/es/table';
import './admin-dashboard.scss';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

interface UserGrowthData {
  month: string;
  users: number;
}

interface RoleDistribution {
  role: string;
  count: number;
  percentage: number;
}

interface ActivityLog {
  key: string;
  user: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

export const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 157,
    totalBooks: 6,
    activeToday: 42,
    alerts: 3,
  });

  const [userGrowth, setUserGrowth] = useState<UserGrowthData[]>([
    { month: '06/2024', users: 98 },
    { month: '07/2024', users: 112 },
    { month: '08/2024', users: 125 },
    { month: '09/2024', users: 138 },
    { month: '10/2024', users: 149 },
    { month: '11/2024', users: 157 },
  ]);

  const [roleDistribution, setRoleDistribution] = useState<RoleDistribution[]>([
    { role: 'Students', count: 150, percentage: 95.5 },
    { role: 'Staff', count: 5, percentage: 3.2 },
    { role: 'Admin', count: 2, percentage: 1.3 },
  ]);

  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([
    {
      key: '1',
      user: 'Nguyễn Văn A',
      action: 'Hoàn thành chương 5 - 82년생 김지영',
      timestamp: '2 phút trước',
      status: 'success',
    },
    {
      key: '2',
      user: 'Trần Thị B',
      action: 'Đăng ký khóa học mới',
      timestamp: '15 phút trước',
      status: 'success',
    },
    {
      key: '3',
      user: 'System',
      action: 'Lỗi đồng bộ dữ liệu từ AI service',
      timestamp: '1 giờ trước',
      status: 'error',
    },
    {
      key: '4',
      user: 'Lê Văn C',
      action: 'Thêm sách mới: 트렌드 코리아 2024',
      timestamp: '2 giờ trước',
      status: 'success',
    },
    {
      key: '5',
      user: 'System',
      action: 'Cảnh báo: Disk space đạt 85%',
      timestamp: '3 giờ trước',
      status: 'warning',
    },
  ]);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const activityColumns: ColumnsType<ActivityLog> = [
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
      width: 150,
    },
    {
      title: 'Hoạt động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 100,
      render(_, record) {
        const statusConfig = {
          success: { color: 'success', text: 'Thành công' },
          warning: { color: 'warning', text: 'Cảnh báo' },
          error: { color: 'error', text: 'Lỗi' },
        };
        const config = statusConfig[record.status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <PageHeader title="Admin Dashboard" subtitle="Tổng quan hệ thống và người dùng" />

        {/* Alert Section */}
        <Alert
          message={`Có ${stats.alerts} cảnh báo cần xử lý`}
          description="AI Service đang có độ trễ cao. Kiểm tra logs để biết thêm chi tiết."
          type="warning"
          icon={<WarningOutlined />}
          showIcon
          closable
          className="alert-section"
          action={
            <Space>
              <a href="/admin/logs">Xem chi tiết</a>
            </Space>
          }
        />

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="stats-section">
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Tổng người dùng"
              value={stats.totalUsers}
              icon={<UserOutlined />}
              color="#3b82f6"
              loading={loading}
              trend={{
                value: 12.5,
                isPositive: true,
                label: 'tháng này',
              }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Tổng sách"
              value={stats.totalBooks}
              icon={<BookOutlined />}
              color="#10b981"
              loading={loading}
              suffix="chương đã publish"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Hoạt động hôm nay"
              value={stats.activeToday}
              icon={<FireOutlined />}
              color="#f59e0b"
              loading={loading}
              suffix={<span style={{ fontSize: 14 }}>/ {stats.totalUsers} users</span>}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Cảnh báo"
              value={stats.alerts}
              icon={<WarningOutlined />}
              color="#ef4444"
              loading={loading}
              suffix="cần xử lý"
            />
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} className="charts-section">
          <Col xs={24} lg={16}>
            <Card title="Tăng trưởng người dùng" className="growth-card">
              <Spin spinning={loading}>
                <div className="growth-chart">
                  {userGrowth.map((item, index) => (
                    <div key={index} className="growth-bar-container">
                      <div className="growth-bar-wrapper">
                        <div
                          className="growth-bar"
                          style={{
                            height: `${(item.users / Math.max(...userGrowth.map(d => d.users))) * 100}%`,
                          }}
                        >
                          <span className="growth-value">{item.users} users</span>
                        </div>
                      </div>
                      <div className="growth-label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </Spin>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Phân bố vai trò" className="role-card">
              <Spin spinning={loading}>
                <div className="role-distribution">
                  {roleDistribution.map((item, index) => (
                    <div key={index} className="role-item">
                      <div className="role-header">
                        <span className="role-name">{item.role}</span>
                        <span className="role-count">{item.count}</span>
                      </div>
                      <Progress
                        percent={item.percentage}
                        strokeColor={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
                        showInfo={false}
                      />
                      <div className="role-percentage">{item.percentage}% total users</div>
                    </div>
                  ))}
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>

        {/* Activity Logs */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card title="Hoạt động gần đây" className="activity-card">
              <Table columns={activityColumns} dataSource={recentActivities} pagination={false} loading={loading} />
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
