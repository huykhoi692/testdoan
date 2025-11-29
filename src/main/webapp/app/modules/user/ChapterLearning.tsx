import React, { useState, useEffect } from 'react';
import { Card, Tabs, Typography, Row, Col, Button, Space, Tag, Spin, Empty, Collapse, List, Progress, message } from 'antd';
import { ReadOutlined, SoundOutlined, FileTextOutlined, BookOutlined, AudioOutlined, FormOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { getChapter, getChapterWords, getChapterGrammars, getChapterExercises } from 'app/shared/services/chapter.service';
import { getChapterProgress } from 'app/shared/services/progress.service';
import { IChapter } from 'app/shared/model/chapter.model';
import { IWord } from 'app/shared/model/word.model';
import { IGrammar } from 'app/shared/model/grammar.model';
import { IListeningExercise } from 'app/shared/model/listening-exercise.model';
import { ISpeakingExercise } from 'app/shared/model/speaking-exercise.model';
import { IReadingExercise } from 'app/shared/model/reading-exercise.model';
import { IWritingExercise } from 'app/shared/model/writing-exercise.model';
import { IChapterProgress } from 'app/shared/model/chapter-progress.model';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ChapterLearning: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
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

  useEffect(() => {
    if (!chapterId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const chapterData = await dispatch(getChapter(parseInt(chapterId, 10))).unwrap();
        setChapter(chapterData);

        const wordsData = await dispatch(getChapterWords(parseInt(chapterId, 10))).unwrap();
        setWords(wordsData);

        const grammarsData = await dispatch(getChapterGrammars(parseInt(chapterId, 10))).unwrap();
        setGrammars(grammarsData);

        const exercisesData = await dispatch(getChapterExercises(parseInt(chapterId, 10))).unwrap();
        setExercises(exercisesData);

        try {
          const progressData = await dispatch(getChapterProgress(parseInt(chapterId, 10))).unwrap();
          setProgress(progressData);
        } catch {
          // No progress yet
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

  const calculateProgress = () => {
    if (!progress) return 0;
    return progress.percent || 0;
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      <Spin spinning={loading}>
        {chapter && (
          <>
            {/* Chapter Header */}
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical" size={8}>
                    <Button type="link" onClick={() => navigate(-1)} style={{ padding: 0 }}>
                      ← Quay lại
                    </Button>
                    <Title level={3} style={{ margin: 0 }}>
                      {chapter.title}
                    </Title>
                    {chapter.description && <Text type="secondary">{chapter.description}</Text>}
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" size={8} align="end">
                    <Text strong>Tiến độ học tập</Text>
                    <Progress
                      type="circle"
                      percent={calculateProgress()}
                      width={80}
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* Content Tabs */}
            <Card style={{ borderRadius: 12 }}>
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
                              {grammar.level && <Tag color="purple">{grammar.level}</Tag>}
                            </Space>
                          }
                          key={grammar.id || index}
                        >
                          <Space direction="vertical" size={12} style={{ width: '100%' }}>
                            {grammar.description && (
                              <div>
                                <Text strong>Nội dung:</Text>
                                <Paragraph style={{ marginTop: 8 }}>{grammar.description}</Paragraph>
                              </div>
                            )}
                            {grammar.grammarExamples && grammar.grammarExamples.length > 0 && (
                              <div>
                                <Text strong>Ví dụ:</Text>
                                <List
                                  size="small"
                                  dataSource={grammar.grammarExamples}
                                  renderItem={example => (
                                    <List.Item>
                                      <div>
                                        <div>{example.exampleSentence}</div>
                                        {example.explanation && (
                                          <Text type="secondary" style={{ fontSize: 12 }}>
                                            {example.explanation}
                                          </Text>
                                        )}
                                      </div>
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
                      dataSource={exercises.listening}
                      renderItem={(ex, index) => (
                        <List.Item
                          key={ex.id}
                          actions={[
                            <Button key="do" type="primary" onClick={() => navigate(`/dashboard/exercises/listening/${ex.id}`)}>
                              Làm bài
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  backgroundColor: '#1890ff',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {index + 1}
                              </div>
                            }
                            title={`Bài nghe ${index + 1}`}
                            description={ex.question}
                          />
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
                      dataSource={exercises.speaking}
                      renderItem={(ex, index) => (
                        <List.Item
                          key={ex.id}
                          actions={[
                            <Button key="do" type="primary" onClick={() => navigate(`/dashboard/exercises/speaking/${ex.id}`)}>
                              Làm bài
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  backgroundColor: '#52c41a',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {index + 1}
                              </div>
                            }
                            title={`Bài nói ${index + 1}`}
                            description={ex.prompt}
                          />
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
                      dataSource={exercises.reading}
                      renderItem={(ex, index) => (
                        <List.Item
                          key={ex.id}
                          actions={[
                            <Button key="do" type="primary" onClick={() => navigate(`/dashboard/exercises/reading/${ex.id}`)}>
                              Làm bài
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  backgroundColor: '#faad14',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {index + 1}
                              </div>
                            }
                            title={`Bài đọc ${index + 1}`}
                            description={ex.question}
                          />
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
                      dataSource={exercises.writing}
                      renderItem={(ex, index) => (
                        <List.Item
                          key={ex.id}
                          actions={[
                            <Button key="do" type="primary" onClick={() => navigate(`/dashboard/exercises/writing/${ex.id}`)}>
                              Làm bài
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  backgroundColor: '#eb2f96',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {index + 1}
                              </div>
                            }
                            title={`Bài viết ${index + 1}`}
                            description={ex.prompt}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </>
        )}
      </Spin>
    </div>
  );
};

export default ChapterLearning;
