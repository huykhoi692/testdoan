import React, { useState, useEffect } from 'react';
import { Card, Button, Progress, Tabs, Row, Col, Statistic, Space, Tag, message, Empty, Spin } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  SyncOutlined,
  DeleteOutlined,
  BookOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './flashcard.scss';

interface Word {
  id: number;
  word: string;
  pronunciation?: string;
  meaning: string;
  wordExamples?: Array<{
    exampleText: string;
    translation: string;
  }>;
}

interface Grammar {
  id: number;
  title: string;
  structure?: string;
  explanation: string;
  example?: string;
}

interface UserVocabulary {
  id: number;
  word: Word;
  isMemorized: boolean;
  nextReviewDate?: string;
  repetitions?: number;
  easinessFactor?: number;
}

interface UserGrammar {
  id: number;
  grammar: Grammar;
  isMemorized: boolean;
  nextReviewDate?: string;
}

interface VocabularyStatistics {
  totalWords: number;
  memorizedWords: number;
  wordsToReview: number;
}

interface GrammarStatistics {
  totalGrammars: number;
  memorizedGrammars: number;
  grammarsToReview: number;
}

const Flashcard: React.FC = () => {
  const { t } = useTranslation(['flashcards', 'common']);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'grammar'>('vocabulary');
  const [vocabularyCards, setVocabularyCards] = useState<UserVocabulary[]>([]);
  const [grammarCards, setGrammarCards] = useState<UserGrammar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vocabStatistics, setVocabStatistics] = useState<VocabularyStatistics | null>(null);
  const [grammarStatistics, setGrammarStatistics] = useState<GrammarStatistics | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, [reviewMode]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadVocabularyCards(), loadGrammarCards(), loadStatistics()]);
    } catch (error) {
      console.error('Error loading flashcard data:', error);
      // Individual functions already handle their own errors
    } finally {
      setLoading(false);
    }
  };

  // Load vocabulary flashcards
  const loadVocabularyCards = async () => {
    try {
      const endpoint = reviewMode ? '/api/user-vocabularies/my-words/review-today' : '/api/user-vocabularies/my-words';
      const response = await axios.get<UserVocabulary[]>(endpoint);
      setVocabularyCards(response.data);
      if (activeTab === 'vocabulary') {
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error('Error loading vocabulary:', error);
      message.error(t('flashcards.messages.loadFailed'));
    }
  };

  // Load grammar flashcards
  const loadGrammarCards = async () => {
    try {
      const endpoint = reviewMode ? '/api/user-grammars/my-grammars/review' : '/api/user-grammars/my-grammars';
      const response = await axios.get<UserGrammar[]>(endpoint);
      setGrammarCards(response.data);
      if (activeTab === 'grammar') {
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error('Error loading grammar cards:', error);
      message.error('Failed to load grammar cards');
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    try {
      const [vocabStatsResponse, grammarStatsResponse] = await Promise.all([
        axios.get<VocabularyStatistics>('/api/user-vocabularies/statistics'),
        axios.get<GrammarStatistics>('/api/user-grammars/statistics'),
      ]);
      setVocabStatistics(vocabStatsResponse.data);
      setGrammarStatistics(grammarStatsResponse.data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    const cards = activeTab === 'vocabulary' ? vocabularyCards : grammarCards;
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    const cards = activeTab === 'vocabulary' ? vocabularyCards : grammarCards;
    setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
  };

  const handleVocabularyReview = async (quality: number) => {
    const currentCard = vocabularyCards[currentIndex];
    if (!currentCard) return;

    try {
      await axios.put(`/api/user-vocabularies/review/${currentCard.word.id}`, null, {
        params: { quality },
      });
      message.success('Review recorded!');
      handleNext();
      await loadStatistics();
      if (reviewMode) {
        await loadVocabularyCards();
      }
    } catch (error) {
      console.error('Error updating vocabulary review:', error);
      message.error('Failed to record review');
    }
  };

  const handleGrammarReview = async (isMemorized: boolean) => {
    const currentCard = grammarCards[currentIndex];
    if (!currentCard) return;

    try {
      await axios.put(`/api/user-grammars/review/${currentCard.grammar.id}`, null, {
        params: { isMemorized },
      });
      message.success('Review recorded!');
      handleNext();
      await loadStatistics();
      if (reviewMode) {
        await loadGrammarCards();
      }
    } catch (error) {
      console.error('Error updating grammar review:', error);
      message.error('Failed to record review');
    }
  };

  const handleRemove = async () => {
    const cards = activeTab === 'vocabulary' ? vocabularyCards : grammarCards;
    const currentCard = cards[currentIndex];
    if (!currentCard) return;

    try {
      if (activeTab === 'vocabulary') {
        await axios.delete(`/api/user-vocabularies/unsave/${(currentCard as UserVocabulary).word.id}`);
        message.success(t('flashcards.messages.removeSuccess'));
        await loadVocabularyCards();
      } else {
        await axios.delete(`/api/user-grammars/unsave/${(currentCard as UserGrammar).grammar.id}`);
        message.success(t('flashcards.messages.removeSuccess'));
        await loadGrammarCards();
      }
      await loadStatistics();
    } catch (error) {
      console.error('Error removing card:', error);
      message.error(t('flashcards.messages.removeFailed'));
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as 'vocabulary' | 'grammar');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCards = activeTab === 'vocabulary' ? vocabularyCards : grammarCards;
  const currentCard = currentCards[currentIndex];

  const renderVocabularyCard = (card: UserVocabulary, flipped: boolean) => {
    if (!flipped) {
      // Front side - Word
      return (
        <div className="card-content">
          <h1 className="card-word">{card.word.word}</h1>
          {card.word.pronunciation && <p className="card-pronunciation">[{card.word.pronunciation}]</p>}
          <Tag color={card.isMemorized ? 'success' : 'warning'} className="card-tag">
            {card.isMemorized ? 'Memorized' : 'Learning'}
          </Tag>
          {card.repetitions !== undefined && <p className="card-meta">Repetitions: {card.repetitions}</p>}
        </div>
      );
    } else {
      // Back side - Meaning and Examples
      return (
        <div className="card-content">
          <h2 className="card-meaning">{card.word.meaning}</h2>
          {card.word.wordExamples && card.word.wordExamples.length > 0 && (
            <div className="card-examples">
              {card.word.wordExamples.map((example, idx) => (
                <div key={idx} className="example-item">
                  <p className="example-sentence">
                    <strong>Example:</strong> {example.exampleText}
                  </p>
                  <p className="example-translation">{example.translation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  const renderGrammarCard = (card: UserGrammar, flipped: boolean) => {
    if (!flipped) {
      // Front side - Title
      return (
        <div className="card-content">
          <h1 className="card-word">{card.grammar.title}</h1>
          <Tag color={card.isMemorized ? 'success' : 'warning'} className="card-tag">
            {card.isMemorized ? t('flashcard.mastered') : t('flashcard.learning')}
          </Tag>
        </div>
      );
    } else {
      // Back side - Details
      return (
        <div className="card-content">
          {card.grammar.structure && (
            <div className="grammar-section">
              <h3>Structure:</h3>
              <p>{card.grammar.structure}</p>
            </div>
          )}
          <div className="grammar-section">
            <h3>Explanation:</h3>
            <p>{card.grammar.explanation}</p>
          </div>
          {card.grammar.example && (
            <div className="grammar-section">
              <h3>Example:</h3>
              <p>{card.grammar.example}</p>
            </div>
          )}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flashcard-container">
      <h1>
        <BookOutlined /> {t('flashcard.title')}
      </h1>

      {/* Statistics Section */}
      <Row gutter={16} className="statistics-section">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('flashcard.totalCards')} value={vocabStatistics?.totalWords || 0} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('flashcard.mastered')}
              value={vocabStatistics?.memorizedWords || 0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title={t('learning.grammar')} value={grammarStatistics?.totalGrammars || 0} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('flashcard.review')}
              value={(vocabStatistics?.wordsToReview || 0) + (grammarStatistics?.grammarsToReview || 0)}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress Bars */}
      <Row gutter={16} className="progress-section">
        <Col xs={24} md={12}>
          <Card title="Vocabulary Progress">
            <Progress
              percent={
                vocabStatistics?.totalWords ? Math.round(((vocabStatistics?.memorizedWords || 0) / vocabStatistics.totalWords) * 100) : 0
              }
              status="active"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Grammar Progress">
            <Progress
              percent={
                grammarStatistics?.totalGrammars
                  ? Math.round(((grammarStatistics?.memorizedGrammars || 0) / grammarStatistics.totalGrammars) * 100)
                  : 0
              }
              status="active"
            />
          </Card>
        </Col>
      </Row>

      {/* Mode Toggle */}
      <div className="mode-toggle" style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          type={reviewMode ? 'primary' : 'default'}
          size="large"
          onClick={() => setReviewMode(!reviewMode)}
          icon={<ClockCircleOutlined />}
        >
          {reviewMode ? 'Review Mode (Due Today)' : 'Study Mode (All Cards)'}
        </Button>
        <Button type="primary" size="large" onClick={() => navigate('/dashboard/flashcard/add')} icon={<PlusOutlined />}>
          Add to Flashcard
        </Button>
      </div>

      {/* Flashcard Tabs */}
      <Card className="flashcard-card">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          centered
          items={[
            {
              key: 'vocabulary',
              label: (
                <span>
                  <BookOutlined />
                  Vocabulary ({vocabularyCards.length})
                </span>
              ),
            },
            {
              key: 'grammar',
              label: (
                <span>
                  <FileTextOutlined />
                  Grammar ({grammarCards.length})
                </span>
              ),
            },
          ]}
        />

        {currentCards.length > 0 ? (
          <div className="flashcard-wrapper">
            {/* Card Counter */}
            <div className="card-counter">
              Card {currentIndex + 1} / {currentCards.length}
            </div>

            {/* Flashcard */}
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  {activeTab === 'vocabulary'
                    ? renderVocabularyCard(currentCard as UserVocabulary, false)
                    : renderGrammarCard(currentCard as UserGrammar, false)}
                </div>
                <div className="flashcard-back">
                  {activeTab === 'vocabulary'
                    ? renderVocabularyCard(currentCard as UserVocabulary, true)
                    : renderGrammarCard(currentCard as UserGrammar, true)}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flashcard-controls">
              <Space size="large">
                <Button icon={<LeftOutlined />} onClick={handlePrevious} size="large">
                  Previous
                </Button>
                <Button icon={<SyncOutlined />} onClick={handleFlip} type="primary" size="large">
                  Flip Card
                </Button>
                <Button icon={<RightOutlined />} onClick={handleNext} size="large">
                  Next
                </Button>
              </Space>
            </div>

            {/* Review Controls (SRS) */}
            {reviewMode && isFlipped && (
              <div className="review-controls">
                <h3>How well did you know this?</h3>
                {activeTab === 'vocabulary' ? (
                  <Space size="middle" wrap>
                    <Button danger onClick={() => handleVocabularyReview(0)} size="large">
                      Again (0)
                    </Button>
                    <Button style={{ backgroundColor: '#ff7875' }} onClick={() => handleVocabularyReview(2)} size="large">
                      Hard (2)
                    </Button>
                    <Button type="primary" onClick={() => handleVocabularyReview(3)} size="large">
                      Good (3)
                    </Button>
                    <Button
                      style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
                      onClick={() => handleVocabularyReview(5)}
                      size="large"
                    >
                      Easy (5)
                    </Button>
                  </Space>
                ) : (
                  <Space size="middle">
                    <Button danger onClick={() => handleGrammarReview(false)} size="large">
                      Not Memorized
                    </Button>
                    <Button
                      style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
                      onClick={() => handleGrammarReview(true)}
                      size="large"
                    >
                      Memorized
                    </Button>
                  </Space>
                )}
              </div>
            )}

            {/* Additional Actions */}
            <div className="additional-actions">
              <Button danger icon={<DeleteOutlined />} onClick={handleRemove}>
                Remove from Flashcards
              </Button>
            </div>
          </div>
        ) : (
          <Empty
            description={
              reviewMode
                ? 'No cards to review today! Great job!'
                : `No ${activeTab} cards available. Add some from your learning materials!`
            }
            style={{ padding: '60px 0' }}
          />
        )}
      </Card>
    </div>
  );
};

export default Flashcard;
