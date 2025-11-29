import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Button, Progress, Typography, Space } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

import { useAppDispatch } from 'app/config/store';
import { getAllBooks } from 'app/shared/services/book.service';
import { IBook } from 'app/shared/model/book.model';

const { Title, Text } = Typography;

const StaffOverview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await dispatch(getAllBooks()).unwrap();
      setBooks(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); // Added fetchBooks to the dependency array

  // Calculate statistics
  const totalBooks = books.length;
  const completedBooks = books.length; // All books are considered completed
  const totalChapters = 0; // Not available in DTO
  const totalPages = 0; // Not available in DTO

  // Books by level
  const booksByLevel = {
    BEGINNER: books.filter(b => b.level === 'BEGINNER').length,
    ELEMENTARY: books.filter(b => b.level === 'ELEMENTARY').length,
    INTERMEDIATE: books.filter(b => b.level === 'INTERMEDIATE').length,
    UPPER_INTERMEDIATE: books.filter(b => b.level === 'UPPER_INTERMEDIATE').length,
    ADVANCED: books.filter(b => b.level === 'ADVANCED').length,
  };

  // Recent books (last 5)
  const recentBooks = [...books]
    .sort((a, b) => {
      const dateA = a.createdDate ? dayjs(a.createdDate).unix() : 0;
      const dateB = b.createdDate ? dayjs(b.createdDate).unix() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  const getStatusTag = (status?: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      PENDING: { color: 'default', text: 'Chờ xử lý' },
      PROCESSING: { color: 'processing', text: 'Đang xử lý' },
      COMPLETED: { color: 'success', text: 'Hoàn thành' },
      FAILED: { color: 'error', text: 'Thất bại' },
    };
    const s = statusMap[status || 'PENDING'];
    return <Tag color={s.color}>{s.text}</Tag>;
  };

  const columns: ColumnsType<IBook> = [
    {
      title: 'Sách',
      key: 'book',
      render: (_, record) => (
        <Space>
          <div
            style={{
              width: 50,
              height: 70,
              backgroundColor: '#f0f0f0',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: record.thumbnailUrl ? `url(${record.thumbnailUrl})` : 'none',
              backgroundSize: 'cover',
            }}
          >
            {!record.thumbnailUrl && <BookOutlined style={{ fontSize: 20, color: '#999' }} />}
          </div>
          <div>
            <Text strong>{record.title}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Cấp độ: {record.level || 'Không rõ'}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      render: level => level || '-',
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'level',
      key: 'status',
      render: level => <Tag color="success">{level || 'N/A'}</Tag>,
      width: 120,
    },
    {
      title: 'Chương',
      key: 'chapters',
      render: () => '-',
      width: 80,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => navigate(`/staff/books`)}>
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => navigate(`/staff/books`)}>
            Sửa
          </Button>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          Staff Overview
        </Title>
        <Text type="secondary">Tổng quan hệ thống quản lý sách</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng số sách"
              value={totalBooks}
              prefix={<BookOutlined style={{ color: '#667eea' }} />}
              valueStyle={{ color: '#667eea', fontWeight: 600 }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} /> +2 tuần này
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Sách hoàn thành"
              value={completedBooks}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 600 }}
            />
            <div style={{ marginTop: 8 }}>
              <Progress
                percent={totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0}
                strokeColor="#52c41a"
                showInfo={false}
                size="small"
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng chương"
              value={totalChapters}
              prefix={<FileTextOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontWeight: 600 }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Trung bình {totalBooks > 0 ? Math.round(totalChapters / totalBooks) : 0} chương/sách
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng trang"
              value={totalPages}
              prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 600 }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Trung bình {totalBooks > 0 ? Math.round(totalPages / totalBooks) : 0} trang/sách
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Books by Level */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Phân bổ sách theo cấp độ" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {Object.entries(booksByLevel).map(([level, count]) => (
                <div key={level}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>{level}</Text>
                    <Text strong>{count} sách</Text>
                  </div>
                  <Progress
                    percent={totalBooks > 0 ? Math.round((count / totalBooks) * 100) : 0}
                    strokeColor={{
                      '0%': '#667eea',
                      '100%': '#764ba2',
                    }}
                    size="small"
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Trạng thái xử lý" bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                    <Text>Hoàn thành</Text>
                  </Space>
                  <Text strong style={{ fontSize: 18 }}>
                    {books.length}
                  </Text>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Space>
                    <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                    <Text>Đang xử lý</Text>
                  </Space>
                  <Text strong style={{ fontSize: 18 }}>
                    0
                  </Text>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Space>
                    <ClockCircleOutlined style={{ color: '#d9d9d9', fontSize: 20 }} />
                    <Text>Chờ xử lý</Text>
                  </Space>
                  <Text strong style={{ fontSize: 18 }}>
                    0
                  </Text>
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Recent Books */}
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Sách mới nhất</span>
            <Button type="link" onClick={() => navigate('/staff/books')}>
              Xem tất cả →
            </Button>
          </div>
        }
        bordered={false}
        style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      >
        <Table columns={columns} dataSource={recentBooks} rowKey="id" pagination={false} loading={loading} />
      </Card>
    </div>
  );
};

export default StaffOverview;
