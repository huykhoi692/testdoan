import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Typography, Spin, Alert } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IBook } from 'app/shared/model/book.model';

import './popular-books.scss';

const { Title, Paragraph, Text } = Typography;

const PopularBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books?page=0&size=3&sort=id,asc');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to load popular books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section id="courses" className="popular-books-section">
      <div className="container">
        <div className="section-title">
          <Title level={2}>Popular Books</Title>
          <Paragraph>Discover the most beloved books.</Paragraph>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
          </div>
        )}

        {error && <Alert message={error} type="error" showIcon />}

        {!loading && !error && (
          <Row gutter={[32, 32]}>
            {books.map(book => (
              <Col xs={24} md={8} key={book.id}>
                <Card
                  hoverable
                  cover={
                    <img alt={book.title} src={book.thumbnailUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'} />
                  }
                  className="book-card"
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <Title level={4}>{book.title}</Title>
                      <Text type="secondary">{book.author}</Text>
                    </div>

                    <div className="book-meta">
                      <Text type="secondary">{book.level}</Text>
                    </div>

                    <Button type="primary" block size="large" icon={<ArrowRightOutlined />} onClick={() => navigate('/register')}>
                      Start Learning
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
};

export default PopularBooks;
