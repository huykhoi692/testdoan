import React from 'react';
import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/dashboard/profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: '/dashboard/courses',
      icon: <BookOutlined />,
      label: 'My Courses',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Setting',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      localStorage.removeItem('authToken');
      navigate('/login');
    } else if (key === 'profile') {
      navigate('/dashboard/profile');
    } else if (key === 'settings') {
      navigate('/dashboard/settings');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <img
            src="content/images/logo.png"
            alt="Langleague"
            style={{
              height: '36px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
          {!collapsed && (
            <Text strong style={{ marginLeft: '12px', fontSize: '18px', color: '#1a1a1a' }}>
              Langleague
            </Text>
          )}
        </div>

        {/* User Info in Sidebar */}
        {!collapsed && (
          <div
            style={{
              padding: '20px',
              borderBottom: '1px solid #f0f0f0',
              background: '#fafafa',
            }}
          >
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <Avatar size={56} src="content/images/jhipster_family_member_0_head-192.png" style={{ border: '2px solid #667eea' }} />
              <div>
                <Text strong style={{ display: 'block', fontSize: '15px' }}>
                  Dung Hang
                </Text>
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  Admin
                </Text>
              </div>
            </Space>
          </div>
        )}

        {/* Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight: 0,
            marginTop: '20px',
            padding: '0 12px',
          }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s', background: '#f5f5f7' }}>
        {/* Header */}
        <Header
          style={{
            padding: '0 40px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: collapsed ? 80 : 260,
            zIndex: 99,
            height: '70px',
            transition: 'left 0.2s',
          }}
        >
          <Space size="middle" align="center">
            {/* Collapse Button */}
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{
                cursor: 'pointer',
                fontSize: '18px',
                color: '#595959',
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '6px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>

            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f5f5f5',
                borderRadius: '20px',
                padding: '8px 20px',
                width: '320px',
              }}
            >
              <SearchOutlined style={{ color: '#8c8c8c', marginRight: '10px', fontSize: '14px' }} />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px',
                  color: '#262626',
                }}
              />
            </div>
          </Space>

          <Space size="middle" align="center">
            {/* Notifications */}
            <Badge count={5} size="small" offset={[-5, 5]}>
              <div
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <BellOutlined style={{ fontSize: '18px', color: '#595959' }} />
              </div>
            </Badge>

            {/* User Menu */}
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight" arrow>
              <Space
                style={{
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Avatar size={36} src="content/images/jhipster_family_member_0_head-192.png" style={{ border: '2px solid #f0f0f0' }} />
                <div style={{ textAlign: 'left', lineHeight: '18px' }}>
                  <Text strong style={{ fontSize: '14px', display: 'block', color: '#262626' }}>
                    Dung Hang
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Admin
                  </Text>
                </div>
              </Space>
            </Dropdown>

            {/* Language Selector */}
            <div
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e8e8e8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#f5f5f5')}
            >
              <Text style={{ fontSize: '13px', fontWeight: 500, color: '#262626' }}>EN 🌐</Text>
            </div>
          </Space>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: '70px 0 0 0',
            background: '#f5f5f7',
            minHeight: 'calc(100vh - 70px - 64px)',
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
            background: '#fff',
            padding: '16px 50px',
          }}
        >
          <Text type="secondary">©2025 All Rights Reserved</Text>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
