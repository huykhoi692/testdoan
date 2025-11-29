import React, { useEffect, useState } from 'react';
import { Card, Tabs, Button, List, Tag, Space, Typography, Avatar, Spin, Progress } from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  SoundOutlined,
  AudioOutlined,
  ReadOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from 'app/shared/components/PageHeader';
import './chapter-detail.scss';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Word {
  id: number;
  text: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: string[];
}

interface Grammar {
  id: number;
  title: string;
  formula: string;
  meaning: string;
  explanation: string;
  examples: string[];
}

interface Exercise {
  id: number;
  title: string;
  type: string;
  maxScore: number;
  completed: boolean;
  score?: number;
}

export const ChapterDetail: React.FC = () => {
  const { bookId, chapterId } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('vocabulary');

  const [chapterInfo, setChapterInfo] = useState({
    bookTitle: '첫 만남 - Cuộc gặp đầu tiên',
    chapterTitle: 'Chương 1',
    description: 'Kim Ji-young gặp người dân ông của đời mình lần đầu tiên',
  });

  const [vocabularyProgress, setVocabularyProgress] = useState({
    learned: 45,
    total: 45,
  });

  const [grammarProgress, setGrammarProgress] = useState({
    learned: 8,
    total: 8,
  });

  const [exerciseProgress, setExerciseProgress] = useState({
    completed: 12,
    total: 12,
  });

  const [vocabulary, setVocabulary] = useState<Word[]>([
    {
      id: 1,
      text: '만남',
      pronunciation: '/man-nam/',
      meaning: 'cuộc gặp; sự gặp gỡ',
      partOfSpeech: 'danh từ',
      examples: ['첫 만남은 언제나 설렙니다'],
    },
    {
      id: 2,
      text: '첫사랑',
      pronunciation: '/cheot-sa-rang/',
      meaning: 'tình yêu đầu',
      partOfSpeech: 'danh từ',
      examples: ['저는 아직도 첫사랑을 잊지 못해요'],
    },
    {
      id: 3,
      text: '설레다',
      pronunciation: '/seol-le-da/',
      meaning: 'hồi hộp, rung động',
      partOfSpeech: 'động từ',
      examples: ['마음이 설레요'],
    },
  ]);

  const [grammar, setGrammar] = useState<Grammar[]>([
    {
      id: 1,
      title: '-았/었어요 (Thì quá khứ)',
      formula: 'Động từ + -았/었어요',
      meaning: 'Diễn tả hành động đã xảy ra trong quá khứ',
      explanation: 'Dùng 았어요 sau nguyên âm sáng (ㅏ, ㅗ), dùng 었어요 sau nguyên âm tối',
      examples: ['먹다 → 먹었어요 (đã ăn)', '가다 → 갔어요 (đã đi)'],
    },
    {
      id: 2,
      title: '-(으)ㄴ/는 (Định ngữ hiện tại)',
      formula: 'Động từ + (으)ㄴ/는 + Danh từ',
      meaning: 'Bổ nghĩa cho danh từ đứng sau',
      explanation: 'Dùng (으)ㄴ cho danh từ đã kết thúc, dùng 는 cho động từ đang diễn ra',
      examples: ['먹는 사람 (người đang ăn)', '간 사람 (người đã đi)'],
    },
  ]);

  const [listeningExercises, setListeningExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: 'Nghe đoạn hội thoại và chọn câu trả lời đúng: Họ gặp nhau ở đâu?',
      type: 'listening',
      maxScore: 10,
      completed: true,
      score: 10,
    },
    {
      id: 2,
      title: 'Có ấy cảm thấy thế nào khi gặp anh ấy lần đầu?',
      type: 'listening',
      maxScore: 10,
      completed: true,
      score: 8,
    },
  ]);

  const [speakingExercises, setSpeakingExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: 'Nghe đoạn hội thoại và chọn câu trả lời đúng: Họ gặp nhau ở đâu?',
      type: 'speaking',
      maxScore: 10,
      completed: false,
    },
    {
      id: 2,
      title: 'Có ấy cảm thấy thế nào khi gặp anh ấy lần đầu?',
      type: 'speaking',
      maxScore: 10,
      completed: false,
    },
  ]);

  const [readingExercises, setReadingExercises] = useState<Exercise[]>([]);
  const [writingExercises, setWritingExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    // TODO: Fetch chapter data from API
    setTimeout(() => setLoading(false), 800);
  }, [chapterId]);

  const getTabIcon = (tab: string) => {
    const icons = {
      vocabulary: <BookOutlined />,
      grammar: <FileTextOutlined />,
      listening: <SoundOutlined />,
      speaking: <AudioOutlined />,
      reading: <ReadOutlined />,
      writing: <EditOutlined />,
    };
    return icons[tab];
  };

  const renderVocabularyTab = () => (
    <div className="vocabulary-section">
      <div className="section-progress">
        <Text strong>Tiến độ học từ vựng</Text>
        <Progress
          percent={Math.round((vocabularyProgress.learned / vocabularyProgress.total) * 100)}
          format={() => `${vocabularyProgress.learned}/${vocabularyProgress.total}`}
        />
      </div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3 }}
        dataSource={vocabulary}
        renderItem={item => (
          <List.Item>
            <Card className="vocabulary-card" hoverable>
              <div className="word-header">
                <Title level={4} className="word-text">
                  {item.text}
                </Title>
                <Tag color="blue">{item.partOfSpeech}</Tag>
              </div>
              <div className="word-pronunciation">{item.pronunciation}</div>
              <div className="word-meaning">{item.meaning}</div>
              {item.examples && item.examples.length > 0 && (
                <div className="word-examples">
                  <Text type="secondary" strong>
                    Ví dụ:
                  </Text>
                  {item.examples.map((example, index) => (
                    <div key={index} className="example-text">
                      • {example}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );

  const renderGrammarTab = () => (
    <div className="grammar-section">
      <div className="section-progress">
        <Text strong>Tiến độ học ngữ pháp</Text>
        <Progress
          percent={Math.round((grammarProgress.learned / grammarProgress.total) * 100)}
          format={() => `${grammarProgress.learned}/${grammarProgress.total}`}
          strokeColor="#10b981"
        />
      </div>
      <List
        dataSource={grammar}
        renderItem={item => (
          <List.Item>
            <Card className="grammar-card">
              <Title level={4}>{item.title}</Title>
              <div className="grammar-formula">
                <Text strong>Công thức:</Text>
                <Tag color="cyan" className="formula-tag">
                  {item.formula}
                </Tag>
              </div>
              <Paragraph>
                <Text strong>Ý nghĩa:</Text> {item.meaning}
              </Paragraph>
              <Paragraph>
                <Text strong>Giải thích:</Text> {item.explanation}
              </Paragraph>
              <div className="grammar-examples">
                <Text strong>Ví dụ:</Text>
                {item.examples.map((example, index) => (
                  <div key={index} className="example-text">
                    • {example}
                  </div>
                ))}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );

  const renderExerciseTab = (exercises: Exercise[], type: string) => (
    <div className="exercise-section">
      <div className="section-progress">
        <Text strong>Tiến độ bài tập</Text>
        <Progress
          percent={Math.round((exerciseProgress.completed / exerciseProgress.total) * 100)}
          format={() => `${exerciseProgress.completed}/${exerciseProgress.total}`}
          strokeColor="#f59e0b"
        />
      </div>
      <List
        dataSource={exercises}
        renderItem={item => (
          <List.Item>
            <Card
              className="exercise-card"
              extra={
                item.completed ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Đã hoàn thành {item.score && `- ${item.score}/${item.maxScore} điểm`}
                  </Tag>
                ) : (
                  <Button type="primary">Làm bài</Button>
                )
              }
            >
              <Card.Meta
                title={`${item.id}. ${item.title}`}
                description={
                  <Space>
                    <Tag>Điểm tối đa: {item.maxScore}</Tag>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div className="chapter-detail">
      <div className="chapter-header">
        <Link to={`/dashboard/books/${bookId}`}>
          <Button icon={<ArrowLeftOutlined />} type="text">
            Quay lại
          </Button>
        </Link>
        <div className="chapter-info">
          <Text type="secondary">{chapterInfo.bookTitle}</Text>
          <Title level={2}>{chapterInfo.chapterTitle}</Title>
          <Paragraph type="secondary">{chapterInfo.description}</Paragraph>
        </div>
      </div>

      <Card className="chapter-content">
        <Spin spinning={loading}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
            <TabPane
              tab={
                <span>
                  {getTabIcon('vocabulary')} Từ vựng ({vocabularyProgress.learned}/{vocabularyProgress.total})
                </span>
              }
              key="vocabulary"
            >
              {renderVocabularyTab()}
            </TabPane>
            <TabPane
              tab={
                <span>
                  {getTabIcon('grammar')} Ngữ pháp ({grammarProgress.learned}/{grammarProgress.total})
                </span>
              }
              key="grammar"
            >
              {renderGrammarTab()}
            </TabPane>
            <TabPane
              tab={
                <span>
                  {getTabIcon('listening')} Luyện nghe ({listeningExercises.filter(e => e.completed).length}/{listeningExercises.length})
                </span>
              }
              key="listening"
            >
              {renderExerciseTab(listeningExercises, 'listening')}
            </TabPane>
            <TabPane
              tab={
                <span>
                  {getTabIcon('speaking')} Luyện nói ({speakingExercises.filter(e => e.completed).length}/{speakingExercises.length})
                </span>
              }
              key="speaking"
            >
              {renderExerciseTab(speakingExercises, 'speaking')}
            </TabPane>
            <TabPane
              tab={
                <span>
                  {getTabIcon('reading')} Luyện đọc ({readingExercises.filter(e => e.completed).length}/{readingExercises.length})
                </span>
              }
              key="reading"
            >
              {renderExerciseTab(readingExercises, 'reading')}
            </TabPane>
            <TabPane
              tab={
                <span>
                  {getTabIcon('writing')} Luyện viết ({writingExercises.filter(e => e.completed).length}/{writingExercises.length})
                </span>
              }
              key="writing"
            >
              {renderExerciseTab(writingExercises, 'writing')}
            </TabPane>
          </Tabs>
        </Spin>
      </Card>
    </div>
  );
};

export default ChapterDetail;
