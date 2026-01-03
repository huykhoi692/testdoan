import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Progress, Tag, List, Spin, Empty, Statistic, message, Avatar } from 'antd';
import {
  ReadOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { getBook, getBookChapters } from 'app/shared/services/book.service';
import { getBookProgress, getChapterProgressesByBook, enrollBook } from 'app/shared/services/progress.service';
import { IBook, IChapter, IBookProgress, IChapterProgress } from 'app/shared/model';
import * as ds from 'app/shared/styles/design-system';

const { Title, Text, Paragraph } = Typography;

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [book, setBook] = useState<IBook | null>(null);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [bookProgress, setBookProgress] = useState<IBookProgress | null>(null);
  const [chapterProgresses, setChapterProgresses] = useState<IChapterProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [chaptersError, setChaptersError] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    const fetchData = async () => {
      setLoading(true);
      setChaptersError(false);
      try {
        const bookResponse = await dispatch(getBook(parseInt(bookId, 10))).unwrap();
        // Handle both axios response and direct data
        const bookData = (bookResponse as any)?.data || bookResponse;
        setBook(bookData as IBook);

        try {
          const chaptersResponse = await dispatch(getBookChapters(parseInt(bookId, 10))).unwrap();
          // Handle both axios response and direct array
          const responseData = chaptersResponse?.data || chaptersResponse;
          const chaptersArray = Array.isArray(responseData) ? responseData : [];
          if (chaptersArray.length === 0) setChaptersError(true);
          setChapters(chaptersArray);
        } catch (chapterError: any) {
          setChaptersError(true);
          message.error('Không thể tải danh sách chương');
        }

        try {
          const progressData = await dispatch(getBookProgress(parseInt(bookId, 10))).unwrap();
          setBookProgress(progressData);
          const chapterProgressData = await dispatch(getChapterProgressesByBook(parseInt(bookId, 10))).unwrap();
          setChapterProgresses(Array.isArray(chapterProgressData) ? chapterProgressData : []);
        } catch (progressError) {
          console.log('No progress data yet for this book');
        }
      } catch (error: any) {
        message.error('Không thể tải thông tin sách');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, dispatch]);

  const getChapterProgress = (chapterId: number) => chapterProgresses.find(cp => cp.chapterId === chapterId);

  const completedChapters = chapterProgresses.filter(cp => cp.completed).length;
  const overallProgress = chapters.length > 0 ? (completedChapters / chapters.length) * 100 : 0;

  const handleStartLearning = async () => {
    if (!bookId) return;
    try {
      setEnrolling(true);
      await dispatch(enrollBook(parseInt(bookId, 10))).unwrap();
      message.success('Đã đăng ký học sách này thành công!');
      // Refresh progress
      const progressData = await dispatch(getBookProgress(parseInt(bookId, 10))).unwrap();
      setBookProgress(progressData);
    } catch (error) {
      message.error('Không thể đăng ký học sách này');
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div style={{ ...ds.pageContainerStyle, padding: ds.spacing.lg }}>
      <Spin spinning={loading}>
        {book && (
          <>
            <Card style={{ ...ds.cardBaseStyle, marginBottom: ds.spacing.lg, background: 'var(--bg-tertiary)' }}>
              <Row gutter={32} align="middle">
                <Col xs={24} md={8} lg={6}>
                  <div
                    style={{
                      width: '100%',
                      paddingTop: '140%', // Aspect ratio 5:7
                      backgroundImage: `url(${book.thumbnail || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: ds.borderRadius.md,
                      boxShadow: ds.shadows.lg,
                    }}
                  />
                </Col>

                <Col xs={24} md={16} lg={18}>
                  <Space vertical size={16} style={{ width: '100%' }}>
                    <div>
                      <Title level={2} style={{ color: ds.colors.text.primary, marginBottom: 4 }}>
                        {book.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: ds.typography.fontSize.md }}>
                        {book.author || 'Không rõ tác giả'}
                      </Text>
                    </div>

                    {book.level && (
                      <Tag
                        color={ds.getLevelColor(book.level)}
                        style={{ fontSize: 14, padding: '4px 12px', borderRadius: ds.borderRadius.sm }}
                      >
                        {ds.getLevelText(book.level)}
                      </Tag>
                    )}

                    <Paragraph style={{ color: ds.colors.text.secondary }}>{book.description || 'Không có mô tả'}</Paragraph>

                    {!bookProgress ? (
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        loading={enrolling}
                        onClick={handleStartLearning}
                        style={{ marginTop: ds.spacing.md, width: '200px' }}
                      >
                        Bắt đầu học ngay
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                        onClick={() => {
                          // Find first uncompleted chapter or first chapter
                          const nextChapter =
                            chapters.find(c => {
                              const p = getChapterProgress(c.id);
                              return !p || !p.isCompleted;
                            }) || chapters[0];

                          if (nextChapter) {
                            navigate(`/dashboard/books/${bookId}/chapter/${nextChapter.id}`);
                          }
                        }}
                        style={{ marginTop: ds.spacing.md, width: '200px' }}
                      >
                        Tiếp tục học
                      </Button>
                    )}

                    <Row gutter={16}>
                      {[
                        // Using an array to easily map over stats
                        { icon: <FileTextOutlined />, title: 'Chương', value: book.totalChapters || chapters.length },
                        { icon: <ReadOutlined />, title: 'Trang', value: book.totalPages || 0 },
                        { icon: <CheckCircleOutlined />, title: 'Hoàn thành', value: `${completedChapters}/${chapters.length}` },
                        { icon: <TrophyOutlined />, title: 'Tiến độ', value: `${Math.round(overallProgress)}%` },
                      ].map(stat => (
                        <Col span={6} key={stat.title}>
                          <Statistic title={stat.title} value={stat.value} prefix={stat.icon} />
                        </Col>
                      ))}
                    </Row>

                    {bookProgress && (
                      <Progress percent={Math.round(overallProgress)} strokeColor={{ '0%': ds.colors.info, '100%': ds.colors.success }} />
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>

            <Card style={ds.cardBaseStyle}>
              <Title level={4} style={{ marginBottom: ds.spacing.lg }}>
                <FileTextOutlined style={{ marginRight: ds.spacing.sm }} />
                Danh sách chương
              </Title>

              {chapters.length === 0 ? (
                <Empty description={chaptersError ? 'Lỗi tải chương.' : 'Chưa có chương nào'}>
                  {chaptersError && (
                    <Button type="primary" onClick={() => window.location.reload()}>
                      Tải lại
                    </Button>
                  )}
                </Empty>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={chapters}
                  renderItem={(chapter, index) => {
                    const progress = getChapterProgress(chapter.id);
                    const isCompleted = progress?.completed || false;
                    const isLocked = !bookProgress && index > 0; // Lock chapters if not enrolled (except first one maybe? or all?)
                    // Actually requirement doesn't say lock, but "Start Learning" is needed.
                    // Let's keep it simple: if not enrolled, clicking chapter triggers enrollment or warning?
                    // For now, just let them click, but maybe show "Start" button.

                    return (
                      <List.Item
                        style={{
                          padding: ds.spacing.md,
                          borderRadius: ds.borderRadius.md,
                          marginBottom: ds.spacing.md,
                          background: isCompleted ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                          border: `1px solid ${isCompleted ? ds.colors.primary.light : ds.colors.border.light}`,
                          cursor: 'pointer',
                          opacity: !bookProgress ? 0.7 : 1,
                        }}
                        onClick={() => {
                          if (!bookProgress) {
                            handleStartLearning();
                          } else {
                            navigate(`/dashboard/books/${bookId}/chapter/${chapter.id}`);
                          }
                        }}
                        actions={[
                          <Button
                            key="action-button"
                            type={!bookProgress ? 'default' : 'primary'}
                            icon={!bookProgress ? <PlayCircleOutlined /> : <ArrowRightOutlined />}
                            onClick={e => {
                              e.stopPropagation();
                              if (!bookProgress) {
                                handleStartLearning();
                              } else {
                                navigate(`/dashboard/books/${bookId}/chapter/${chapter.id}`);
                              }
                            }}
                          >
                            {isCompleted ? 'Ôn tập' : !bookProgress ? 'Bắt đầu học' : progress ? 'Tiếp tục' : 'Bắt đầu'}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar size={48} style={{ backgroundColor: isCompleted ? ds.colors.success : ds.colors.info }}>
                              {isCompleted ? <CheckCircleOutlined /> : index + 1}
                            </Avatar>
                          }
                          title={
                            <Text strong style={{ fontSize: ds.typography.fontSize.md }}>
                              {chapter.title}
                            </Text>
                          }
                          description={
                            <Space size={16} style={{ color: ds.colors.text.secondary, fontSize: ds.typography.fontSize.sm }}>
                              {chapter.totalWords && (
                                <span>
                                  <ReadOutlined /> {chapter.totalWords} từ
                                </span>
                              )}
                              {chapter.totalGrammars && (
                                <span>
                                  <FileTextOutlined /> {chapter.totalGrammars} ngữ pháp
                                </span>
                              )}
                            </Space>
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              )}
            </Card>
          </>
        )}
      </Spin>
    </div>
  );
};

export default BookDetail;
