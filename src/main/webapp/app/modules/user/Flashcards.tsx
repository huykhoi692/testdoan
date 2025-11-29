import React, { useState, useEffect } from 'react';
import { Button, Spin, Typography, Row, Col } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, SoundOutlined } from '@ant-design/icons';
import axios from 'axios';
import { IUserVocabulary } from 'app/shared/model/user-vocabulary.model';
import DashboardLayout from 'app/shared/layout/dashboard-layout';
import './flashcards.scss';

const { Title, Text } = Typography;

const Flashcards = () => {
  const [vocab, setVocab] = useState<IUserVocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVocab = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/user-vocabularies/saved');
        setVocab(response.data);
      } catch (error) {
        console.error('Error fetching vocabulary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVocab();
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % vocab.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + vocab.length) % vocab.length);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; // Assuming Korean
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (vocab.length === 0) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Title level={3}>No vocabulary saved yet.</Title>
          <Text>Start reading and save some words to practice!</Text>
        </div>
      </DashboardLayout>
    );
  }

  const currentWord = vocab[currentIndex]?.word;

  return (
    <DashboardLayout>
      <div className="flashcard-container">
        <Title level={2}>Flashcards</Title>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <Title level={3}>{currentWord?.text}</Title>
              <Button
                icon={<SoundOutlined />}
                onClick={e => {
                  e.stopPropagation();
                  speak(currentWord?.text);
                }}
              >
                Listen
              </Button>
            </div>
            <div className="flashcard-back">
              <Title level={4}>{currentWord?.meaning}</Title>
              <Text>{currentWord?.pronunciation}</Text>
            </div>
          </div>
        </div>
        <Row justify="center" align="middle" style={{ marginTop: 24 }}>
          <Col>
            <Button icon={<ArrowLeftOutlined />} onClick={handlePrev} disabled={vocab.length <= 1}>
              Previous
            </Button>
          </Col>
          <Col style={{ margin: '0 16px' }}>
            <Text>
              {currentIndex + 1} / {vocab.length}
            </Text>
          </Col>
          <Col>
            <Button icon={<ArrowRightOutlined />} onClick={handleNext} disabled={vocab.length <= 1}>
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default Flashcards;
