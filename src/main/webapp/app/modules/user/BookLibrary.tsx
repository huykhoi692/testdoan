import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Typography, Input, Select, Spin, Tag, Space, Empty } from 'antd';
import { BookOutlined, SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { searchBooks, getAllBooks } from 'app/shared/services/book.service';
import { IBook } from 'app/shared/model/book.model';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const BookLibrary: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const fetchAndSetBooks = useCallback(
    async (query: string, level: string) => {
      setLoading(true);
      try {
        let result;
        if (query) {
          result = await dispatch(searchBooks(query)).unwrap();
        } else {
          result = await dispatch(getAllBooks()).unwrap();
        }

        let booksArray = Array.isArray(result) ? result : [];

        if (level !== 'all') {
          booksArray = booksArray.filter(book => book.level === level);
        }

        setBooks(booksArray);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const debouncedSearch = useCallback(
    (query: string, level: string) => {
      const timeoutId = setTimeout(() => {
        fetchAndSetBooks(query, level);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    [fetchAndSetBooks],
  );

  useEffect(() => {
    return debouncedSearch(searchText, selectedLevel);
  }, [searchText, selectedLevel, debouncedSearch]);

  const getLevelColor = (level?: string) => {
    const colors: Record<string, string> = {
      BEGINNER: 'green',
      ELEMENTARY: 'cyan',
      INTERMEDIATE: 'blue',
      UPPER_INTERMEDIATE: 'purple',
      ADVANCED: 'red',
    };
    return colors[level || 'BEGINNER'] || 'default';
  };

  const getLevelText = (level?: string) => {
    const texts: Record<string, string> = {
      BEGINNER: 'Sơ cấp',
      ELEMENTARY: 'Cơ bản',
      INTERMEDIATE: 'Trung cấp',
      UPPER_INTERMEDIATE: 'Trung cao cấp',
      ADVANCED: 'Cao cấp',
    };
    return texts[level || 'BEGINNER'] || level;
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '40px 24px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>
            <BookOutlined style={{ marginRight: 12 }} />
            Thư Viện Sách Hàn Quốc
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 16 }}>
            Khám phá và học tiếng Hàn với hàng trăm cuốn sách Hàn Quốc được AI phân tích chi tiết
          </Paragraph>
        </div>

        {/* Filters */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Input
                size="large"
                placeholder="Tìm kiếm theo tên sách, tác giả..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
                style={{ borderRadius: 8 }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                size="large"
                placeholder="Cấp độ"
                value={selectedLevel}
                onChange={setSelectedLevel}
                style={{ width: '100%', borderRadius: 8 }}
              >
                <Option value="all">Tất cả cấp độ</Option>
                <Option value="BEGINNER">Sơ cấp</Option>
                <Option value="ELEMENTARY">Cơ bản</Option>
                <Option value="INTERMEDIATE">Trung cấp</Option>
                <Option value="UPPER_INTERMEDIATE">Trung cao cấp</Option>
                <Option value="ADVANCED">Cao cấp</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Book Grid */}
        <Spin spinning={loading}>
          {books.length === 0 ? (
            <Empty description="Không tìm thấy sách nào" style={{ marginTop: 60 }} />
          ) : (
            <Row gutter={[24, 24]}>
              {books.map(book => (
                <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          height: 280,
                          backgroundColor: '#f5f5f5',
                          backgroundImage: book.thumbnailUrl ? `url(${book.thumbnailUrl})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px 12px 0 0',
                        }}
                      >
                        {!book.thumbnailUrl && <BookOutlined style={{ fontSize: 80, color: '#d9d9d9' }} />}
                      </div>
                    }
                    style={{ borderRadius: 12, overflow: 'hidden' }}
                    onClick={() => navigate(`/dashboard/books/${book.id}`)}
                  >
                    <Card.Meta
                      title={
                        <div style={{ marginBottom: 8 }}>
                          <Text strong ellipsis style={{ fontSize: 16 }}>
                            {book.title}
                          </Text>
                        </div>
                      }
                      description={
                        <Space direction="vertical" size={8} style={{ width: '100%' }}>
                          <Text type="secondary" ellipsis style={{ fontSize: 13 }}>
                            Cấp độ: {getLevelText(book.level)}
                          </Text>

                          {book.level && (
                            <Tag color={getLevelColor(book.level)} style={{ marginTop: 4 }}>
                              {getLevelText(book.level)}
                            </Tag>
                          )}

                          <Space split="|" size={4} style={{ fontSize: 12, color: '#999' }}>
                            <span>
                              <FileTextOutlined /> {book.level || 'Không rõ cấp độ'}
                            </span>
                          </Space>

                          <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
                            {book.description || 'Không có mô tả'}
                          </Paragraph>
                        </Space>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Spin>
      </div>
    </DashboardLayout>
  );
};

export default BookLibrary;
