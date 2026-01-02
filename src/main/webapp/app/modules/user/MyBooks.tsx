import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Space, Tag, Progress, Empty, Spin, Modal, message, Select, Tabs, Statistic } from 'antd';
import {
  BookOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUserBooks, removeUserBook, toggleFavorite } from 'app/shared/reducers/user-book.reducer';
import { IUserBook } from 'app/shared/model/user-book.model';
import * as ds from 'app/shared/styles/design-system';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const MyBooks: React.FC = () => {
  const { t } = useTranslation(['user', 'common']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const books = useAppSelector(state => state.userBook.entities);
  const loading = useAppSelector(state => state.userBook.loading);

  const [activeTab, setActiveTab] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState<ReadonlyArray<IUserBook>>([]);

  useEffect(() => {
    dispatch(getUserBooks());
  }, []);

  useEffect(() => {
    filterBooks(activeTab);
  }, [books, activeTab]);

  const filterBooks = (tab: string) => {
    let filtered = books;
    switch (tab) {
      case 'favorites':
        filtered = books.filter(b => b.isFavorite);
        break;
      case 'in-progress':
        filtered = books.filter(b => b.learningStatus === 'IN_PROGRESS');
        break;
      case 'completed':
        filtered = books.filter(b => b.learningStatus === 'COMPLETED');
        break;
      case 'not-started':
        filtered = books.filter(b => b.learningStatus === 'NOT_STARTED');
        break;
      default:
        filtered = books;
    }
    setFilteredBooks(filtered);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleRemoveBook = (bookId: number, bookTitle: string) => {
    Modal.confirm({
      title: 'Remove Book',
      content: `Are you sure you want to remove "${bookTitle}" from your library?`,
      okText: 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        dispatch(removeUserBook(bookId));
      },
    });
  };

  const handleToggleFavorite = (bookId: number) => {
    dispatch(toggleFavorite(bookId));
  };

  // Calculate statistics from local data
  const statistics = {
    totalBooks: books.length,
    booksInProgress: books.filter(b => b.learningStatus === 'IN_PROGRESS').length,
    booksCompleted: books.filter(b => b.learningStatus === 'COMPLETED').length,
    favoriteBooks: books.filter(b => b.isFavorite).length,
  };

  return (
    <div style={{ ...ds.pageContainerStyle, padding: ds.spacing.lg }}>
      <div style={{ marginBottom: ds.spacing.xl }}>
        <Title level={2}>
          <BookOutlined style={{ marginRight: ds.spacing.sm, color: ds.colors.primary.DEFAULT }} />
          {t('myBooks.title')}
        </Title>
        <Paragraph type="secondary">Manage your learning progress and favorite books.</Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[ds.layout.cardGutter.desktop, ds.layout.cardGutter.desktop]} style={{ marginBottom: ds.spacing.xl }}>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#e6f7ff' }}>
            <Statistic title="Total Books" value={statistics.totalBooks} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#f6ffed' }}>
            <Statistic title="In Progress" value={statistics.booksInProgress} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#fff7e6' }}>
            <Statistic title="Completed" value={statistics.booksCompleted} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ textAlign: 'center', background: '#fff0f6' }}>
            <Statistic title="Favorites" value={statistics.favoriteBooks} prefix={<HeartFilled style={{ color: '#eb2f96' }} />} />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="all" onChange={handleTabChange} size="large" style={{ marginBottom: ds.spacing.lg }}>
        <TabPane tab="All Books" key="all" />
        <TabPane tab="In Progress" key="in-progress" />
        <TabPane tab="Completed" key="completed" />
        <TabPane tab="Favorites" key="favorites" />
      </Tabs>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : filteredBooks.length === 0 ? (
        <Empty
          description={
            <span>
              No books found. <a onClick={() => navigate('/book-library')}>Browse Library</a>
            </span>
          }
        />
      ) : (
        <Row gutter={[ds.layout.cardGutter.desktop, ds.layout.cardGutter.desktop]}>
          {filteredBooks.map(book => (
            <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
              <Card
                hoverable
                style={{ ...ds.cardBaseStyle, height: '100%', display: 'flex', flexDirection: 'column' }}
                cover={
                  <div
                    style={{
                      height: 200,
                      backgroundImage: `url(${'/content/images/logo-jhipster.png'})`, // Placeholder, should use book.bookThumbnail if available
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/dashboard/books/${book.bookId}/chapters`)}
                  >
                    {book.learningStatus === 'COMPLETED' && (
                      <Tag color="success" style={{ position: 'absolute', top: 10, right: 10 }}>
                        Completed
                      </Tag>
                    )}
                    {book.learningStatus === 'IN_PROGRESS' && (
                      <Tag color="processing" style={{ position: 'absolute', top: 10, right: 10 }}>
                        In Progress
                      </Tag>
                    )}
                  </div>
                }
                actions={[
                  <Button
                    key="study"
                    type="text"
                    icon={<PlayCircleOutlined />}
                    onClick={() => navigate(`/dashboard/books/${book.bookId}/chapters`)}
                  >
                    Study
                  </Button>,
                  <Button
                    key="favorite"
                    type="text"
                    icon={book.isFavorite ? <HeartFilled style={{ color: '#eb2f96' }} /> : <HeartOutlined />}
                    onClick={() => handleToggleFavorite(book.bookId)}
                  />,
                  <Button
                    key="remove"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveBook(book.bookId, book.bookTitle)}
                  />,
                ]}
              >
                <Card.Meta
                  title={book.bookTitle}
                  description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Progress percent={book.progressPercentage} size="small" />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Last accessed: {book.lastAccessedAt ? new Date(book.lastAccessedAt).toLocaleDateString() : 'Never'}
                      </Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyBooks;
