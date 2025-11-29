import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Spin, List, Button, Avatar, Tag, Divider, Rate, message } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined, CheckCircleFilled, StarOutlined, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import { IBook } from 'app/shared/model/book.model';
import { IChapter } from 'app/shared/model/chapter.model';
import { IChapterProgress } from 'app/shared/model/chapter-progress.model';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Title, Text, Paragraph } = Typography;

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<IBook | null>(null);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [progress, setProgress] = useState<IChapterProgress[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const bookResponse = await axios.get(`/api/books/${bookId}`);
        setBook(bookResponse.data);

        const chaptersResponse = await axios.get(`/api/books/${bookId}/chapters`);
        setChapters(chaptersResponse.data);

        const progressResponse = await axios.get(`/api/chapter-progresses/book/${bookId}`);
        setProgress(progressResponse.data);

        const favoritesResponse = await axios.get('/api/favorites');
        setFavorites(favoritesResponse.data.map(fav => fav.id));

        const ratingResponse = await axios.get(`/api/book-reviews/book/${bookId}/average`);
        setRating(ratingResponse.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  const handleRate = async (value: number) => {
    try {
      await axios.post('/api/book-reviews/rate', null, { params: { bookId, rating: value } });
      setRating(value);
      message.success('Thanks for your rating!');
    } catch (error) {
      message.error('Failed to submit your rating.');
    }
  };

  const toggleFavorite = async (chapterId: number) => {
    const isFavorite = favorites.includes(chapterId);
    try {
      if (isFavorite) {
        await axios.delete(`/api/favorites/chapter/${chapterId}`);
        setFavorites(favorites.filter(id => id !== chapterId));
        message.success('Removed from favorites.');
      } else {
        await axios.post(`/api/favorites/chapter/${chapterId}`);
        setFavorites([...favorites, chapterId]);
        message.success('Added to favorites.');
      }
    } catch (error) {
      message.error('Failed to update favorites.');
    }
  };

  const getLevelColor = (level?: string) => {
    const colors: Record<string, string> = {
      BEGINNER: 'green',
      INTERMEDIATE: 'blue',
      ADVANCED: 'red',
    };
    return colors[level || 'BEGINNER'] || 'default';
  };

  const isChapterCompleted = (chapterId: number) => {
    return progress.some(p => p.chapter?.id === chapterId && p.completed);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (!book) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Title level={3}>Book not found</Title>
          <Button onClick={() => navigate('/dashboard/books')}>Back to Library</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard/books')} style={{ marginBottom: 24 }}>
          Back to Library
        </Button>

        <Card>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <img
                src={book.thumbnailUrl || '/content/images/placeholder.png'}
                alt={book.title}
                style={{ width: '100%', borderRadius: 8 }}
              />
            </Col>
            <Col xs={24} md={16}>
              <Title level={2}>{book.title}</Title>
              <Text strong>Author:</Text> <Text>{book.author}</Text>
              <br />
              <Text strong>Level:</Text> <Tag color={getLevelColor(book.level)}>{book.level}</Tag>
              <br />
              <Rate onChange={handleRate} value={rating} />
              <Divider />
              <Paragraph>{book.description}</Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => chapters.length > 0 && navigate(`/dashboard/books/${book.id}/chapters/${chapters[0].id}`)}
              >
                Start Reading
              </Button>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Title level={3}>Chapters</Title>
          <List
            itemLayout="horizontal"
            dataSource={chapters}
            renderItem={(chapter, index) => (
              <List.Item
                actions={[
                  <Button
                    key="favorite"
                    icon={favorites.includes(chapter.id) ? <StarFilled /> : <StarOutlined />}
                    onClick={() => toggleFavorite(chapter.id)}
                  />,
                  <Button key="read" onClick={() => navigate(`/dashboard/books/${book.id}/chapters/${chapter.id}`)}>
                    Read
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<FileTextOutlined />} />}
                  title={
                    <a onClick={() => navigate(`/dashboard/books/${book.id}/chapters/${chapter.id}`)}>
                      {`Chapter ${index + 1}: ${chapter.title}`}
                      {isChapterCompleted(chapter.id) && <CheckCircleFilled style={{ color: 'green', marginLeft: 8 }} />}
                    </a>
                  }
                  description={`${chapter.content?.substring(0, 100) || ''}...`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BookDetail;
