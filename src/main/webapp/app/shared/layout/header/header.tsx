import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, BellOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppSelector } from 'app/config/store';
import type { MenuProps } from 'antd';
import './header.css';

export interface IHeaderProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  ribbonEnv?: string;
  isInProduction?: boolean;
  isOpenAPIEnabled?: boolean;
}

export const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();
  const account = useAppSelector(state => state.authentication.account);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'profile',
      label: 'My Profile',
      onClick: () => navigate('/dashboard/profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => navigate('/dashboard/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      danger: true,
      onClick() {
        localStorage.removeItem('jhi-authenticationToken');
        sessionStorage.removeItem('jhi-authenticationToken');
        navigate('/login');
        window.location.reload();
      },
    },
  ];

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src="content/images/logo.png" alt="Langleague" style={{ height: '40px', objectFit: 'contain' }} />
          <span className="logo-text">Langleague</span>
        </Link>

        <nav className="header-nav">
          <Link to="/#features" className="nav-link">
            Features
          </Link>
          <Link to="/#courses" className="nav-link">
            Courses
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <Space size="middle">
              <Badge count={3}>
                <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} onClick={() => navigate('/notifications')} />
              </Badge>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar size={36} icon={<UserOutlined />} src={account.imageUrl} style={{ cursor: 'pointer', background: '#667eea' }} />
              </Dropdown>
            </Space>
          ) : (
            <Space>
              <Button onClick={() => navigate('/login')}>Log In</Button>
              <Button type="primary" onClick={() => navigate('/register')} className="btn-gradient">
                Sign Up
              </Button>
            </Space>
          )}
        </div>

        <Button type="text" icon={<MenuOutlined />} className="mobile-menu-btn" />
      </div>
    </header>
  );
};

export default Header;
