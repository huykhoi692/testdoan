import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './PageHeader.scss';

const { Title, Text } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    title: string;
    path?: string;
  }>;
  extra?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs, extra }) => {
  return (
    <div className="page-header">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="page-header-breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <Breadcrumb.Item key={index}>{crumb.path ? <Link to={crumb.path}>{crumb.title}</Link> : crumb.title}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}
      <div className="page-header-content">
        <div className="page-header-text">
          <Title level={2} className="page-header-title">
            {title}
          </Title>
          {subtitle && (
            <Text type="secondary" className="page-header-subtitle">
              {subtitle}
            </Text>
          )}
        </div>
        {extra && <div className="page-header-extra">{extra}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
