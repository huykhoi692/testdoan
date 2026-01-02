import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Progress, Tag, Space, Button, Input, Select, Spin, Empty, message } from 'antd';
import { BookOutlined, ClockCircleOutlined, CheckCircleOutlined, PlayCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getBook, getBookChapters } from 'app/shared/services/book.service';
import { IBook, IChapter } from 'app/shared/model/models';

const { Title, Text } = Typography;

const BookChapters = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();

  const [book, setBook] = useState<IBook | null>(null);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchData(courseId);
    }
  }, [courseId]);

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const bookAction = await dispatch(getBook(id));
      if (getBook.fulfilled.match(bookAction)) {
        setBook(bookAction.payload);
      }

      const chaptersAction = await dispatch(getBookChapters(id));
      if (getBookChapters.fulfilled.match(chaptersAction)) {
        const data = chaptersAction.payload;
        setChapters(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      message.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(ch => ch.title.toLowerCase().includes(searchText.toLowerCase()));

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Empty description="Course not found" />
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', background: '#f5f5f7', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Book Header */}
        <Card
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            marginBottom: '32px',
            borderRadius: '16px',
            border: 'none',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Row gutter={32} align="middle">
            <Col>
              <img
                src={book.thumbnail || 'https://via.placeholder.com/160x220'}
                alt={book.title}
                style={{
                  width: '160px',
                  height: '220px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              />
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div>
                  <Tag color="gold" style={{ marginBottom: '8px' }}>
                    {book.level || 'Beginner'}
                  </Tag>
                  <Title level={2} style={{ color: 'white', margin: 0 }}>
                    {book.title}
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.8)' }}>{book.author}</Text>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '12px' }}>
                  <Space direction="vertical" size={8} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text style={{ color: 'white' }}>Total Chapters</Text>
                      <Text strong style={{ color: 'white' }}>
                        {chapters.length} Chapters
                      </Text>
                    </div>
                  </Space>
                </div>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Filters */}
        <Card
          style={{
            marginBottom: '24px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          bodyStyle={{ padding: '20px' }}
        >
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                size="large"
                placeholder="Search chapters..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </Col>
          </Row>
        </Card>

        {/* Chapters List */}
        <Row gutter={[24, 24]}>
          {filteredChapters.map((chapter, index) => (
            <Col xs={24} md={12} lg={8} key={chapter.id}>
              <Card
                hoverable
                style={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                bodyStyle={{ padding: '24px' }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Tag color="blue">Chapter {chapter.orderIndex || index + 1}</Tag>

                  <div>
                    <Title level={4} style={{ margin: 0, fontSize: '18px' }}>
                      {chapter.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '15px', display: 'block', marginTop: '4px' }}>
                      {chapter.description}
                    </Text>
                  </div>

                  <Space split={<span style={{ color: '#d9d9d9' }}>•</span>}>
                    <Space size={4}>
                      <BookOutlined style={{ fontSize: '14px', color: '#8c8c8c' }} />
                      <Text type="secondary" style={{ fontSize: '13px' }}>
                        {chapter.totalWords || 0} words
                      </Text>
                    </Space>
                  </Space>

                  <Button
                    type="primary"
                    block
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={() => navigate(`/dashboard/books/${book.id}/chapter/${chapter.id}`)}
                    style={{ borderRadius: '8px', marginTop: '8px' }}
                  >
                    Start Learning
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BookChapters;
