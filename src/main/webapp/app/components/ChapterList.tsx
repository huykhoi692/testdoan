import React, { useEffect } from 'react';
import { useTranslation } from 'app/shared/utils/useTranslation';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Space, Spin, Empty, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../config/store';
import { getChapters, getChaptersByBookId } from '../shared/reducers/chapter.reducer';
import { getChapterProgressesByBook } from '../shared/services/progress.service';

const { Title, Text } = Typography;

interface ChapterListProps {
  bookId?: number;
}

const ChapterList: React.FC<ChapterListProps> = ({ bookId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookId: paramBookId } = useParams<{ bookId: string }>();
  const chapters = useAppSelector(state => state.chapter.entities);
  const loading = useAppSelector(state => state.chapter.loading);
  const chapterProgresses = useAppSelector(state => state.progress.chapterProgresses);

  const effectiveBookId = bookId || (paramBookId ? parseInt(paramBookId, 10) : undefined);

  useEffect(() => {
    if (effectiveBookId) {
      dispatch(getChaptersByBookId(effectiveBookId));
      dispatch(getChapterProgressesByBook(effectiveBookId));
    } else {
      dispatch(getChapters());
    }
  }, [effectiveBookId, dispatch]);

  if (loading || !chapters) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div style={{ padding: '24px' }}>
        <Empty description="No chapters found for this book">
          <Button type="primary" onClick={() => navigate('/dashboard/books')}>
            Back to Books
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {chapters.map(chapter => {
          const progress = chapterProgresses.find(cp => cp.chapterId === chapter.id);
          const isCompleted = progress?.isCompleted;

          return (
            <Col xs={24} sm={12} md={8} key={chapter.id}>
              <Card hoverable>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Title level={4} style={{ margin: 0 }}>
                      {chapter.title}
                    </Title>
                    {isCompleted && <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                  </div>
                  <Text type="secondary">Chapter {chapter.orderIndex}</Text>
                  {chapter.bookTitle && <Text type="secondary">Book: {chapter.bookTitle}</Text>}
                  <Link to={`/dashboard/chapters/${chapter.id}/study`}>
                    <Button type={isCompleted ? 'default' : 'primary'} block>
                      {isCompleted ? 'Review' : 'Start Learning'}
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ChapterList;
