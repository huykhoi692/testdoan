import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IVocabulary } from 'app/shared/model/vocabulary.model';
import './flashcard.scss';

export const Flashcard = () => {
  const [vocabularies, setVocabularies] = useState<IVocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (unitId) {
      loadVocabularies();
    }
  }, [unitId]);

  const loadVocabularies = async () => {
    try {
      const response = await axios.get(`/api/units/${unitId}/vocabularies`);
      setVocabularies(response.data);
    } catch (error) {
      console.error('Error loading vocabularies:', error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % vocabularies.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + vocabularies.length) % vocabularies.length);
  };

  const handleShuffle = () => {
    const shuffled = [...vocabularies].sort(() => Math.random() - 0.5);
    setVocabularies(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (!vocabularies.length) {
    return (
      <div className="flashcard-container">
        <div className="flashcard-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>
        <div className="empty-state">
          <i className="bi bi-card-text"></i>
          <p>No flashcards available</p>
        </div>
      </div>
    );
  }

  const currentVocab = vocabularies[currentIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <div className="header-actions">
          <button onClick={handleShuffle} className="shuffle-btn">
            <i className="bi bi-shuffle"></i> Shuffle
          </button>
          <button onClick={() => setIsStudyMode(!isStudyMode)} className={`mode-btn ${isStudyMode ? 'active' : ''}`}>
            <i className="bi bi-star"></i> Study Mode
          </button>
        </div>
      </div>

      <div className="flashcard-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIndex + 1) / vocabularies.length) * 100}%` }} />
        </div>
        <span className="progress-text">
          {currentIndex + 1} / {vocabularies.length}
        </span>
      </div>

      <div className="flashcard-main">
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="card-content">
                <div className="term-label">TERM</div>
                <div className="term-content">
                  <h2>{currentVocab.word}</h2>
                  {currentVocab.phonetic && <p className="pronunciation">/{currentVocab.phonetic}/</p>}
                </div>
                {currentVocab.imageUrl && (
                  <div className="card-image">
                    <img src={currentVocab.imageUrl} alt={currentVocab.word} />
                  </div>
                )}
              </div>
              <div className="flip-hint">
                <i className="bi bi-arrow-repeat"></i> Click to flip
              </div>
            </div>

            <div className="flashcard-back">
              <div className="card-content">
                <div className="definition-label">DEFINITION</div>
                <div className="definition-content">
                  <h3>{currentVocab.meaning}</h3>
                  {currentVocab.example && (
                    <div className="example">
                      <p className="example-text">
                        <i className="bi bi-quote"></i> {currentVocab.example}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flip-hint">
                <i className="bi bi-arrow-repeat"></i> Click to flip
              </div>
            </div>
          </div>
        </div>

        <div className="flashcard-controls">
          <button onClick={handlePrevious} className="control-btn" disabled={vocabularies.length <= 1}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="center-controls">
            {isStudyMode && (
              <>
                <button className="know-btn">
                  <i className="bi bi-check-circle"></i> Know
                </button>
                <button className="study-btn">
                  <i className="bi bi-x-circle"></i> Study
                </button>
              </>
            )}
          </div>

          <button onClick={handleNext} className="control-btn" disabled={vocabularies.length <= 1}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="flashcard-grid">
        <div className="grid-header">
          <h3>All Cards ({vocabularies.length})</h3>
        </div>
        <div className="cards-grid">
          {vocabularies.map((vocab, index) => (
            <div
              key={vocab.id}
              className={`card-mini ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                setIsFlipped(false);
              }}
            >
              <div className="card-mini-number">{index + 1}</div>
              <div className="card-mini-word">{vocab.word}</div>
              <div className="card-mini-meaning">{vocab.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
