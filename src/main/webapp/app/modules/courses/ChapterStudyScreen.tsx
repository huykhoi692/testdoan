import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Tag, Divider, Tabs, Progress, Spin, Alert, message } from 'antd';
import {
  SoundOutlined,
  TranslationOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ReadOutlined,
  EditOutlined,
  AudioOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getChapterContent } from 'app/shared/services/chapter.service';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// --- INTERFACES (Matching Backend ChapterDTO) ---
interface Word {
  id: number;
  text: string;
  meaning: string;
  pronunciation?: string;
  partOfSpeech?: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface GrammarExample {
  id: number;
  exampleSentence: string;
  explanation?: string;
}

interface Grammar {
  id: number;
  title: string;
  description: string;
  level?: string;
  grammarExamples?: GrammarExample[];
}

interface ReadingOption {
  id: number;
  label?: string;
  content: string;
  isCorrect: boolean;
}

interface ReadingExercise {
  id: number;
  passage: string;
  question?: string;
  maxScore?: number;
  readingOptions?: ReadingOption[];
}

interface ListeningOption {
  id: number;
  label?: string;
  content: string;
  isCorrect: boolean;
}

interface ListeningExercise {
  id: number;
  audioUrl: string;
  transcript?: string;
  question?: string;
  maxScore?: number;
  listeningOptions?: ListeningOption[];
}

interface WritingExercise {
  id: number;
  prompt: string;
  sampleAnswer?: string;
  maxScore?: number;
}

interface SpeakingExercise {
  id: number;
  topic: string;
  sampleAudio?: string;
  maxScore?: number;
}

interface ChapterInfo {
  id: number;
  title: string;
  orderIndex: number;
  description?: string;
  book?: { id: number; title: string }; // Basic book info
}

interface ChapterContent {
  info: ChapterInfo;
  words?: Word[];
  grammars?: Grammar[];
  listeningExercises?: ListeningExercise[];
  readingExercises?: ReadingExercise[];
  writingExercises?: WritingExercise[];
  speakingExercises?: SpeakingExercise[];
}

const ChapterStudyScreen = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams<{ chapterId: string }>();
  const { t } = useTranslation(['chapterStudy', 'global']);

  const [loading, setLoading] = useState(true);
  const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false); // For reading exercises

  useEffect(() => {
    const fetchChapterData = async () => {
      if (!chapterId) {
        setError(t('error.chapterIdMissing'));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getChapterContent(Number(chapterId));
        setChapterContent(response.data);
      } catch (err) {
        console.error('Failed to load chapter content:', err);
        setError(t('error.loadFailed'));
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [chapterId, t]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" tip={t('global.loading')} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <Alert message={t('global.error')} description={error} type="error" showIcon />
      </div>
    );
  }

  if (!chapterContent || !chapterContent.info) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <Title level={3}>{t('error.chapterNotFound')}</Title>
        <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          {t('global.back')}
        </Button>
      </div>
    );
  }

  const { info, words, grammars, listeningExercises, readingExercises, writingExercises, speakingExercises } = chapterContent;

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
        {t('backToBook')}
      </Button>

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
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Tag color="gold">
            {t('chapter')} {info.orderIndex}
          </Tag>
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            {info.title}
          </Title>
          <Title level={4} style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 400 }}>
            {info.description}
          </Title>
          {info.book && (
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
              {t('fromBook')}: {info.book.title}
            </Text>
          )}
        </Space>
      </Card>

      <Tabs defaultActiveKey="vocabulary" size="large">
        {words && words.length > 0 && (
          <TabPane
            tab={
              <Space>
                <GlobalOutlined />
                {t('vocabulary')}
              </Space>
            }
            key="vocabulary"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('vocabularyList')}</Title>
              <Row gutter={[16, 16]}>
                {words.map(word => (
                  <Col xs={24} sm={12} md={8} lg={6} key={word.id}>
                    <Card size="small" style={{ background: '#f5f5f5', border: 'none', borderRadius: '8px' }}>
                      <Space direction="vertical" size={4}>
                        <Text strong style={{ fontSize: '18px', color: '#667eea' }}>
                          {word.text}
                        </Text>
                        {word.pronunciation && <Text type="secondary">[{word.pronunciation}]</Text>}
                        <Text style={{ fontSize: '14px' }}>{word.meaning}</Text>
                        {word.partOfSpeech && <Tag color="blue">{word.partOfSpeech}</Tag>}
                        {word.imageUrl && (
                          <img src={word.imageUrl} alt={word.text} style={{ maxWidth: '100%', borderRadius: '4px', marginTop: '8px' }} />
                        )}
                        {word.audioUrl && (
                          <audio controls src={word.audioUrl} style={{ width: '100%', marginTop: '8px' }}>
                            {t('global.audioNotSupported')}
                          </audio>
                        )}
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </TabPane>
        )}

        {grammars && grammars.length > 0 && (
          <TabPane
            tab={
              <Space>
                <BookOutlined />
                {t('grammar')}
              </Space>
            }
            key="grammar"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('grammarPoints')}</Title>
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                {grammars.map(grammar => (
                  <Card key={grammar.id} size="small" style={{ background: '#fafafa', borderRadius: '8px' }}>
                    <Title level={5} style={{ margin: 0, color: '#667eea' }}>
                      {grammar.title} {grammar.level && <Tag color="green">{grammar.level}</Tag>}
                    </Title>
                    <Paragraph style={{ marginTop: '8px' }}>{grammar.description}</Paragraph>
                    {grammar.grammarExamples && grammar.grammarExamples.length > 0 && (
                      <>
                        <Divider orientation="left">{t('examples')}</Divider>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          {grammar.grammarExamples.map(example => (
                            <div key={example.id}>
                              <Text code>{example.exampleSentence}</Text>
                              {example.explanation && <Paragraph type="secondary">{example.explanation}</Paragraph>}
                            </div>
                          ))}
                        </Space>
                      </>
                    )}
                  </Card>
                ))}
              </Space>
            </Card>
          </TabPane>
        )}

        {readingExercises && readingExercises.length > 0 && (
          <TabPane
            tab={
              <Space>
                <ReadOutlined />
                {t('readingExercise')}
              </Space>
            }
            key="reading"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('readingComprehension')}</Title>
              {readingExercises.map(exercise => (
                <div key={exercise.id} style={{ marginBottom: '24px' }}>
                  <Paragraph>{exercise.passage}</Paragraph>
                  {/* Render questions and options here */}
                </div>
              ))}
            </Card>
          </TabPane>
        )}

        {listeningExercises && listeningExercises.length > 0 && (
          <TabPane
            tab={
              <Space>
                <AudioOutlined />
                {t('listeningExercise')}
              </Space>
            }
            key="listening"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('listeningPractice')}</Title>
              {listeningExercises.map(exercise => (
                <div key={exercise.id} style={{ marginBottom: '24px' }}>
                  <audio controls src={exercise.audioUrl} style={{ width: '100%' }}>
                    {t('global.audioNotSupported')}
                  </audio>
                  {exercise.question && <Paragraph>{exercise.question}</Paragraph>}
                  {/* Render options here */}
                </div>
              ))}
            </Card>
          </TabPane>
        )}

        {writingExercises && writingExercises.length > 0 && (
          <TabPane
            tab={
              <Space>
                <EditOutlined />
                {t('writingExercise')}
              </Space>
            }
            key="writing"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('writingPrompts')}</Title>
              {writingExercises.map(exercise => (
                <div key={exercise.id} style={{ marginBottom: '24px' }}>
                  <Paragraph>{exercise.prompt}</Paragraph>
                  {exercise.sampleAnswer && (
                    <Paragraph type="secondary">
                      {t('sampleAnswer')}: {exercise.sampleAnswer}
                    </Paragraph>
                  )}
                  {/* User input area */}
                </div>
              ))}
            </Card>
          </TabPane>
        )}

        {speakingExercises && speakingExercises.length > 0 && (
          <TabPane
            tab={
              <Space>
                <SoundOutlined />
                {t('speakingExercise')}
              </Space>
            }
            key="speaking"
          >
            <Card
              style={{ borderRadius: '16px', border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
              bodyStyle={{ padding: '32px' }}
            >
              <Title level={4}>{t('speakingPractice')}</Title>
              {speakingExercises.map(exercise => (
                <div key={exercise.id} style={{ marginBottom: '24px' }}>
                  <Paragraph>{exercise.topic}</Paragraph>
                  {exercise.sampleAudio && (
                    <audio controls src={exercise.sampleAudio} style={{ width: '100%', marginTop: '8px' }}>
                      {t('global.audioNotSupported')}
                    </audio>
                  )}
                  {/* User recording area */}
                </div>
              ))}
            </Card>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default ChapterStudyScreen;
