import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './StatCard.scss';

const { Text } = Typography;

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon?: React.ReactNode;
  color?: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, prefix, suffix, trend, icon, color, loading }) => {
  return (
    <Card className="stat-card" loading={loading}>
      <div className="stat-card-content">
        <div className="stat-card-main">
          <div className="stat-card-header">
            <Text type="secondary" className="stat-card-title">
              {title}
            </Text>
            {icon && (
              <div className="stat-card-icon" style={{ backgroundColor: color ? `${color}15` : undefined }}>
                {React.cloneElement(icon as React.ReactElement, {
                  style: { color: color || '#6366f1', fontSize: 20 },
                })}
              </div>
            )}
          </div>
          <Statistic value={value} prefix={prefix} suffix={suffix} valueStyle={{ fontSize: 28, fontWeight: 600, color: '#1f2937' }} />
        </div>
        {trend && (
          <div className="stat-card-trend">
            {trend.isPositive ? (
              <Text type="success">
                <ArrowUpOutlined /> {trend.value}%
              </Text>
            ) : (
              <Text type="danger">
                <ArrowDownOutlined /> {Math.abs(trend.value)}%
              </Text>
            )}
            {trend.label && <Text type="secondary"> {trend.label}</Text>}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
