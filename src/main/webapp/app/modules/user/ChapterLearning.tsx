import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Tabs, Typography, Row, Col, Button, Space, Tag, Spin, Empty, Progress, message, Breadcrumb, Collapse, List } from 'antd';
import {
  ReadOutlined,
  SoundOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  BookOutlined,
  AudioOutlined,
  FormOutlined,
  ArrowLeftOutlined,
  RightOutlined,
  LeftOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getChapter } from 'app/shared/reducers/chapter.reducer';
import {
  getChapterWords,
  getChapterGrammars,
  getChapterExercises,
  getNextChapter,
  getPreviousChapter,
} from 'app/shared/services/chapter.service';
import { getChapterProgress, markChapterAsCompleted } from 'app/shared/services/progress.service';
import { startStudySession } from 'app/shared/reducers/study-session.reducer';

import {
  IChapter,
  IChapterProgress,
  IWord,
  IGrammar,
  IListeningExercise,
  ISpeakingExercise,
  IReadingExercise,
  IWritingExercise,
} from 'app/shared/model';

import ReadingExercise from './ReadingExercise';
import ListeningExercise from './ListeningExercise';
import SpeakingExercise from './SpeakingExercise';
import WritingExercise from './WritingExercise';
import ChapterDiscussion from './ChapterDiscussion';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ChapterLearning: React.FC = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [words, setWords] = useState<IWord[]>([]);
  const [grammars, setGrammars] = useState<IGrammar[]>([]);
  const [exercises, setExercises] = useState<{
    listening: IListeningExercise[];
    speaking: ISpeakingExercise[];
    reading: IReadingExercise[];
    writing: IWritingExercise[];
  } | null>(null);
  const [progress, setProgress] = useState<IChapterProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [completing, setCompleting] = useState(false);
  const [nextChapterId, setNextChapterId] = useState<number | null>(null);
  const [prevChapterId, setPrevChapterId] = useState<number | null>(null);

  useEffect(() => {
    if (!chapterId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const cId = parseInt(chapterId, 10);

        // 1. Get Chapter Details
        const chapterData = await dispatch(getChapter(cId)).unwrap();
        setChapter(chapterData);

        // 2. Start Session
        dispatch(startStudySession(cId));

        // 3. Get Content
        const wordsData = await dispatch(getChapterWords(cId)).unwrap();
        setWords(wordsData);

        const grammarsData = await dispatch(getChapterGrammars(cId)).unwrap();
        setGrammars(grammarsData);

        const exercisesData = await dispatch(getChapterExercises(cId)).unwrap();
        setExercises(exercisesData);

        // 4. Get Progress
        try {
          const progressData = await dispatch(getChapterProgress(cId)).unwrap();
          setProgress(progressData);
        } catch {
          // Ignore if no progress found
        }

        // 5. Get Next/Prev Chapters
        try {
          const next = await dispatch(getNextChapter(cId)).unwrap();
          if (next) setNextChapterId(next.id);
        } catch {
          /* ignore */
        }

        try {
          const prev = await dispatch(getPreviousChapter(cId)).unwrap();
          if (prev) setPrevChapterId(prev.id);
        } catch {
          /* ignore */
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
        message.error('Không thể tải dữ liệu chương');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId, dispatch]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleCompleteChapter = async () => {
    if (!chapterId) return;
    try {
      setCompleting(true);
      const cId = parseInt(chapterId, 10);
      await dispatch(markChapterAsCompleted(cId)).unwrap();
      message.success('Chúc mừng! Bạn đã hoàn thành chương này.');

      // Refresh progress
      const progressData = await dispatch(getChapterProgress(cId)).unwrap();
      setProgress(progressData);

      // Navigate to next chapter if available, else back to book
      if (nextChapterId) {
        setTimeout(() => {
          navigate(`/dashboard/books/${bookId}/chapters/${nextChapterId}`);
        }, 1500);
      } else {
        setTimeout(() => {
          navigate(`/dashboard/books/${bookId}`);
        }, 1500);
      }
    } catch (error) {
      message.error('Không thể đánh dấu hoàn thành chương');
    } finally {
      setCompleting(false);
    }
  };

  const handleNavigateChapter = (targetId: number | null) => {
    if (targetId) {
      navigate(`/dashboard/books/${bookId}/chapters/${targetId}`);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/dashboard/books">Thư viện</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/dashboard/books/${bookId}`}>Chi tiết sách</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Học tập</Breadcrumb.Item>
      </Breadcrumb>

      <Spin spinning={loading}>
        {chapter && (
          <>
            <Card style={{ marginBottom: 24 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Title level={2}>{chapter.title}</Title>
                  <Text type="secondary">{chapter.description}</Text>
                </Col>
                <Col>
                  <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(`/dashboard/books/${bookId}`)}>
                      Quay lại sách
                    </Button>
                    {!progress?.completed ? (
                      <Button type="primary" icon={<CheckCircleOutlined />} loading={completing} onClick={handleCompleteChapter}>
                        Hoàn thành chương
                      </Button>
                    ) : (
                      <Tag color="success" icon={<CheckCircleOutlined />} style={{ padding: '6px 12px', fontSize: '14px' }}>
                        Đã hoàn thành
                      </Tag>
                    )}
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Text strong>Tiến độ học tập:</Text>
                  <Progress percent={progress?.percent || 0} />
                </Col>
              </Row>
            </Card>

            {/* Content Tabs */}
            <Card variant="borderless" style={{ borderRadius: 12 }}>
              <Tabs activeKey={activeTab} onChange={handleTabChange} size="large">
                {/* Vocabulary Tab */}
                <TabPane
                  tab={
                    <span>
                      <BookOutlined />
                      Từ vựng ({words.length})
                    </span>
                  }
                  key="vocabulary"
                >
                  {words.length === 0 ? (
                    <Empty description="Chưa có từ vựng" />
                  ) : (
                    <Row gutter={[16, 16]}>
                      {words.map(word => (
                        <Col xs={24} sm={12} md={8} key={word.id}>
                          <Card
                            hoverable
                            size="small"
                            style={{ borderRadius: 8, height: '100%' }}
                            cover={
                              word.imageUrl && (
                                <div
                                  style={{
                                    height: 150,
                                    backgroundImage: `url(${word.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '8px 8px 0 0',
                                  }}
                                />
                              )
                            }
                          >
                            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                              <Title level={5} style={{ margin: 0 }}>
                                {word.text}
                                {word.pronunciation && (
                                  <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
                                    /{word.pronunciation}/
                                  </Text>
                                )}
                              </Title>
                              {word.partOfSpeech && (
                                <Tag color="blue" style={{ fontSize: 11 }}>
                                  {word.partOfSpeech}
                                </Tag>
                              )}
                              {word.meaning && <Text>{word.meaning}</Text>}
                              {word.exampleSentence && (
                                <div style={{ marginTop: 8, fontSize: 12, color: '#666', fontStyle: 'italic' }}>
                                  "{word.exampleSentence}"
                                </div>
                              )}
                            </Space>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </TabPane>

                {/* Grammar Tab */}
                <TabPane
                  tab={
                    <span>
                      <FileTextOutlined />
                      Ngữ pháp ({grammars.length})
                    </span>
                  }
                  key="grammar"
                >
                  {grammars.length === 0 ? (
                    <Empty description="Chưa có ngữ pháp" />
                  ) : (
                    <Collapse accordion>
                      {grammars.map((grammar, index) => (
                        <Panel
                          header={
                            <Space>
                              <span style={{ fontWeight: 500 }}>
                                {index + 1}. {grammar.title}
                              </span>
                              <Tag color="purple">{grammar.pattern}</Tag>
                            </Space>
                          }
                          key={grammar.id || index}
                        >
                          <Space direction="vertical" size={12} style={{ width: '100%' }}>
                            <div>
                              <Text strong>Công thức:</Text>
                              <Paragraph style={{ marginTop: 8, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                                <code>{grammar.pattern}</code>
                              </Paragraph>
                            </div>
                            {grammar.meaning && (
                              <div>
                                <Text strong>Ý nghĩa:</Text>
                                <Paragraph style={{ marginTop: 8 }}>{grammar.meaning}</Paragraph>
                              </div>
                            )}
                            {grammar.explanation && (
                              <div>
                                <Text strong>Giải thích:</Text>
                                <Paragraph style={{ marginTop: 8 }}>{grammar.explanation}</Paragraph>
                              </div>
                            )}
                            {grammar.examples && grammar.examples.length > 0 && (
                              <div>
                                <Text strong>Ví dụ:</Text>
                                <List
                                  size="small"
                                  dataSource={grammar.examples}
                                  renderItem={item => (
                                    <List.Item>
                                      <Space direction="vertical" size={0}>
                                        <Text>{item.sentence}</Text>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                          {item.translation}
                                        </Text>
                                      </Space>
                                    </List.Item>
                                  )}
                                />
                              </div>
                            )}
                          </Space>
                        </Panel>
                      ))}
                    </Collapse>
                  )}
                </TabPane>

                {/* Exercises Tabs */}
                <TabPane
                  tab={
                    <span>
                      <AudioOutlined />
                      Luyện nghe ({exercises?.listening.length || 0})
                    </span>
                  }
                  key="listening"
                >
                  {!exercises || exercises.listening.length === 0 ? (
                    <Empty description="Chưa có bài tập nghe" />
                  ) : (
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={exercises.listening}
                      renderItem={ex => (
                        <List.Item>
                          <ListeningExercise exercise={ex} />
                        </List.Item>
                      )}
                    />
                  )}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <SoundOutlined />
                      Luyện nói ({exercises?.speaking.length || 0})
                    </span>
                  }
                  key="speaking"
                >
                  {!exercises || exercises.speaking.length === 0 ? (
                    <Empty description="Chưa có bài tập nói" />
                  ) : (
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={exercises.speaking}
                      renderItem={ex => (
                        <List.Item>
                          <SpeakingExercise exercise={ex} />
                        </List.Item>
                      )}
                    />
                  )}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <ReadOutlined />
                      Luyện đọc ({exercises?.reading.length || 0})
                    </span>
                  }
                  key="reading"
                >
                  {!exercises || exercises.reading.length === 0 ? (
                    <Empty description="Chưa có bài tập đọc" />
                  ) : (
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={exercises.reading}
                      renderItem={ex => (
                        <List.Item>
                          <ReadingExercise exercise={ex} />
                        </List.Item>
                      )}
                    />
                  )}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <FormOutlined />
                      Luyện viết ({exercises?.writing.length || 0})
                    </span>
                  }
                  key="writing"
                >
                  {!exercises || exercises.writing.length === 0 ? (
                    <Empty description="Chưa có bài tập viết" />
                  ) : (
                    <List
                      grid={{ gutter: 16, column: 1 }}
                      dataSource={exercises.writing}
                      renderItem={ex => (
                        <List.Item>
                          <WritingExercise exercise={ex} />
                        </List.Item>
                      )}
                    />
                  )}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <FormOutlined />
                      Thảo luận
                    </span>
                  }
                  key="discussion"
                >
                  <ChapterDiscussion chapterId={parseInt(chapterId || '0', 10)} />
                </TabPane>
              </Tabs>
            </Card>

            {/* Footer Navigation */}
            <Row justify="space-between" style={{ marginTop: 24 }}>
              <Col>
                <Button icon={<LeftOutlined />} disabled={!prevChapterId} onClick={() => handleNavigateChapter(prevChapterId)}>
                  Chương trước
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<RightOutlined />}
                  disabled={!nextChapterId}
                  onClick={() => handleNavigateChapter(nextChapterId)}
                >
                  Chương tiếp theo
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Spin>
    </div>
  );
};

export default ChapterLearning;
