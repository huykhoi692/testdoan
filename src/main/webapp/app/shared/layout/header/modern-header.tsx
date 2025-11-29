import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Button, Space } from 'antd';

import { useAppSelector } from 'app/config/store';
import { AccountMenu } from '../menus';
import './modern-header.scss';

const ModernHeader = () => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  return (
    <header className="modern-header">
      <div className="container-fluid">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src="content/images/logo-no-background.svg" alt="LangLeague" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/">
                  <Translate contentKey="global.menu.home">Home</Translate>
                </Link>
              </li>
              <li>
                <Link to="/courses">
                  <Translate contentKey="global.menu.courses">Courses</Translate>
                </Link>
              </li>
              <li>
                <Link to="/features">
                  <Translate contentKey="global.menu.features">Features</Translate>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <Translate contentKey="global.menu.contact">Contact</Translate>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="auth-section">
            {isAuthenticated ? (
              <AccountMenu isAuthenticated={isAuthenticated} />
            ) : (
              <Space>
                <Link to="/login">
                  <Button type="primary" ghost>
                    <Translate contentKey="global.menu.account.login">Sign in</Translate>
                  </Button>
                </Link>
                <Link to="/account/register">
                  <Button type="primary">
                    <Translate contentKey="global.menu.account.register">Register</Translate>
                  </Button>
                </Link>
              </Space>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
