import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IUnit, defaultValue as defaultUnit } from 'app/shared/model/unit.model';
import { IVocabulary, defaultValue as defaultVocab } from 'app/shared/model/vocabulary.model';
import { IGrammar, defaultValue as defaultGrammar } from 'app/shared/model/grammar.model';
import { IQuestion, defaultValue as defaultQuestion, ExerciseType } from 'app/shared/model/question.model';
import { IQuestionOption, defaultValue as defaultOption } from 'app/shared/model/question-option.model';
import './unit-update-v2.scss';

export const UnitUpdateV2 = () => {
  const [unit, setUnit] = useState<IUnit>(defaultUnit);
  const [vocabularies, setVocabularies] = useState<IVocabulary[]>([]);
  const [grammars, setGrammars] = useState<IGrammar[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionOptions, setQuestionOptions] = useState<{ [questionId: number]: IQuestionOption[] }>({});
  const [focusedSection, setFocusedSection] = useState<number | string | null>(null);
  const [draggedVocabIndex, setDraggedVocabIndex] = useState<number | null>(null);
  const [draggedGrammarIndex, setDraggedGrammarIndex] = useState<number | null>(null);
  const [draggedQuestionIndex, setDraggedQuestionIndex] = useState<number | null>(null);

  const { bookId, unitId } = useParams<{ bookId: string; unitId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (unitId) {
      loadUnit();
      loadVocabularies();
      loadGrammars();
      loadQuestions();
    }
  }, [unitId]);

  const loadUnit = async () => {
    try {
      const response = await axios.get(`/api/units/${unitId}`);
      setUnit(response.data);
    } catch (error) {
      console.error('Error loading unit:', error);
    }
  };

  const loadVocabularies = async () => {
    try {
      const response = await axios.get(`/api/units/${unitId}/vocabularies`);
      setVocabularies(response.data);
    } catch (error) {
      console.error('Error loading vocabularies:', error);
    }
  };

  const loadGrammars = async () => {
    try {
      const response = await axios.get(`/api/units/${unitId}/grammars`);
      setGrammars(response.data);
    } catch (error) {
      console.error('Error loading grammars:', error);
    }
  };

  const loadQuestions = async () => {
    try {
      const response = await axios.get(`/api/units/${unitId}/questions`);
      const questionsData = response.data;
      setQuestions(questionsData);

      // Load options for each question
      const optionsMap: { [questionId: number]: IQuestionOption[] } = {};
      for (const question of questionsData) {
        if (question.id) {
          const optionsResponse = await axios.get(`/api/questions/${question.id}/options`);
          optionsMap[question.id] = optionsResponse.data;
        }
      }
      setQuestionOptions(optionsMap);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handleSaveUnit = async () => {
    try {
      if (unitId) {
        await axios.put(`/api/units/${unitId}`, unit);
      } else {
        await axios.post('/api/units', { ...unit, bookId });
      }
      navigate(`/teacher/books/${bookId}/edit`);
    } catch (error) {
      console.error('Error saving unit:', error);
    }
  };

  // Vocabulary functions
  const addVocabulary = () => {
    setVocabularies([...vocabularies, { ...defaultVocab }]);
  };

  const updateVocabulary = (index: number, field: keyof IVocabulary, value: any) => {
    const updated = [...vocabularies];
    updated[index] = { ...updated[index], [field]: value };
    setVocabularies(updated);
  };

  const deleteVocabulary = (index: number) => {
    setVocabularies(vocabularies.filter((_, i) => i !== index));
  };

  // Vocabulary drag & drop handlers
  const handleVocabDragStart = (index: number) => {
    setDraggedVocabIndex(index);
  };

  const handleVocabDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedVocabIndex === null || draggedVocabIndex === index) return;

    const items = [...vocabularies];
    const draggedItem = items[draggedVocabIndex];
    items.splice(draggedVocabIndex, 1);
    items.splice(index, 0, draggedItem);

    setVocabularies(items);
    setDraggedVocabIndex(index);
  };

  const handleVocabDragEnd = () => {
    setDraggedVocabIndex(null);
    // Update orderIndex for all vocabularies
    const updated = vocabularies.map((vocab, idx) => ({
      ...vocab,
      orderIndex: idx + 1,
    }));
    setVocabularies(updated);
  };

  const duplicateVocabulary = (index: number) => {
    const vocab = { ...vocabularies[index], id: undefined };
    const updated = [...vocabularies];
    updated.splice(index + 1, 0, vocab);
    setVocabularies(updated);
  };

  // Grammar functions
  const addGrammar = () => {
    setGrammars([...grammars, { ...defaultGrammar }]);
  };

  const updateGrammar = (index: number, field: keyof IGrammar, value: any) => {
    const updated = [...grammars];
    updated[index] = { ...updated[index], [field]: value };
    setGrammars(updated);
  };

  const deleteGrammar = (index: number) => {
    setGrammars(grammars.filter((_, i) => i !== index));
  };

  const duplicateGrammar = (index: number) => {
    const grammar = { ...grammars[index], id: undefined };
    const updated = [...grammars];
    updated.splice(index + 1, 0, grammar);
    setGrammars(updated);
  };

  const handleGrammarDragStart = (index: number) => {
    setDraggedGrammarIndex(index);
  };

  const handleGrammarDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedGrammarIndex === null || draggedGrammarIndex === index) return;

    const items = [...grammars];
    const draggedItem = items[draggedGrammarIndex];
    items.splice(draggedGrammarIndex, 1);
    items.splice(index, 0, draggedItem);

    setGrammars(items);
    setDraggedGrammarIndex(index);
  };

  const handleGrammarDragEnd = () => {
    setDraggedGrammarIndex(null);
  };

  // Question functions
  const addQuestion = (type: ExerciseType = ExerciseType.SINGLE_CHOICE) => {
    const newQuestion = { ...defaultQuestion, exerciseType: type };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, field: keyof IQuestion, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const duplicateQuestion = (index: number) => {
    const question = { ...questions[index], id: undefined };
    const updated = [...questions];
    updated.splice(index + 1, 0, question);
    setQuestions(updated);
  };

  const handleQuestionDragStart = (index: number) => {
    setDraggedQuestionIndex(index);
  };

  const handleQuestionDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedQuestionIndex === null || draggedQuestionIndex === index) return;

    const items = [...questions];
    const draggedItem = items[draggedQuestionIndex];
    items.splice(draggedQuestionIndex, 1);
    items.splice(index, 0, draggedItem);

    setQuestions(items);
    setDraggedQuestionIndex(index);
  };

  const handleQuestionDragEnd = () => {
    setDraggedQuestionIndex(null);
  };

  // Question options functions
  const addOption = (questionIndex: number) => {
    const question = questions[questionIndex];
    if (!question.id) return;

    const currentOptions = questionOptions[question.id] || [];
    setQuestionOptions({
      ...questionOptions,
      [question.id]: [...currentOptions, { ...defaultOption, exerciseId: question.id }],
    });
  };

  const updateOption = (questionId: number, optionIndex: number, field: keyof IQuestionOption, value: any) => {
    const options = [...(questionOptions[questionId] || [])];
    options[optionIndex] = { ...options[optionIndex], [field]: value };
    setQuestionOptions({
      ...questionOptions,
      [questionId]: options,
    });
  };

  const deleteOption = (questionId: number, optionIndex: number) => {
    const options = (questionOptions[questionId] || []).filter((_, i) => i !== optionIndex);
    setQuestionOptions({
      ...questionOptions,
      [questionId]: options,
    });
  };

  return (
    <div className="unit-update-v2">
      {/* Header */}
      <div className="form-header">
        <button onClick={() => navigate(`/teacher/books/${bookId}/edit`)} className="back-btn">
          <i className="bi bi-arrow-left"></i>
        </button>
        <div className="header-content">
          <input
            type="text"
            className="chapter-title-input"
            value={unit.title}
            onChange={e => setUnit({ ...unit, title: e.target.value })}
            placeholder="Unit Title"
          />
          <textarea
            className="chapter-description-input"
            value={unit.summary}
            onChange={e => setUnit({ ...unit, summary: e.target.value })}
            placeholder="Unit Description"
            rows={2}
          />
        </div>
        <button onClick={handleSaveUnit} className="send-btn">
          <i className="bi bi-send"></i> Submit
        </button>
      </div>

      {/* Main Content */}
      <div className="form-content">
        {/* Vocabulary Section */}
        <div className="section-divider">
          <div className="divider-line"></div>
          <h3 className="section-title">
            <i className="bi bi-chat-square-text"></i> Vocabulary
          </h3>
          <div className="divider-line"></div>
        </div>

        {vocabularies.map((vocab, index) => (
          <div
            key={index}
            className={`form-card ${focusedSection === index ? 'focused' : ''} ${draggedVocabIndex === index ? 'dragging' : ''}`}
            onClick={() => setFocusedSection(index)}
            draggable
            onDragStart={() => handleVocabDragStart(index)}
            onDragOver={e => handleVocabDragOver(e, index)}
            onDragEnd={handleVocabDragEnd}
          >
            <div className="card-header">
              <i className="bi bi-grip-vertical drag-handle"></i>
              <span className="card-number">{index + 1}</span>
              <i className="bi bi-chat-square-text card-icon"></i>
            </div>

            <div className="card-body">
              <div className="form-field">
                <input
                  type="text"
                  value={vocab.word}
                  onChange={e => updateVocabulary(index, 'word', e.target.value)}
                  placeholder="Word (e.g., Hello)"
                  className="field-input"
                />
                <div className="field-underline"></div>
              </div>

              <div className="form-field">
                <input
                  type="text"
                  value={vocab.phonetic}
                  onChange={e => updateVocabulary(index, 'phonetic', e.target.value)}
                  placeholder="Phonetic (e.g., /həˈloʊ/)"
                  className="field-input"
                />
                <div className="field-underline"></div>
              </div>

              <div className="form-field">
                <input
                  type="text"
                  value={vocab.meaning}
                  onChange={e => updateVocabulary(index, 'meaning', e.target.value)}
                  placeholder="Meaning"
                  className="field-input"
                />
                <div className="field-underline"></div>
              </div>

              <div className="form-field">
                <textarea
                  value={vocab.example}
                  onChange={e => updateVocabulary(index, 'example', e.target.value)}
                  placeholder="Example sentence"
                  className="field-textarea"
                  rows={2}
                />
                <div className="field-underline"></div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <input
                    type="text"
                    value={vocab.imageUrl}
                    onChange={e => updateVocabulary(index, 'imageUrl', e.target.value)}
                    placeholder="Image URL"
                    className="field-input small"
                  />
                  <div className="field-underline"></div>
                </div>
                <div className="form-field">
                  <input
                    type="number"
                    value={vocab.orderIndex}
                    onChange={e => updateVocabulary(index, 'orderIndex', parseInt(e.target.value, 10))}
                    placeholder="Order"
                    className="field-input small"
                  />
                  <div className="field-underline"></div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="action-btn" onClick={() => duplicateVocabulary(index)}>
                <i className="bi bi-files"></i>
              </button>
              <button className="action-btn delete" onClick={() => deleteVocabulary(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <button className="add-section-btn" onClick={addVocabulary}>
          <i className="bi bi-plus-circle"></i> Add Vocabulary
        </button>

        {/* Grammar Section */}
        <div className="section-divider">
          <div className="divider-line"></div>
          <h3 className="section-title">
            <i className="bi bi-book"></i> Grammar
          </h3>
          <div className="divider-line"></div>
        </div>

        {grammars.map((grammar, index) => (
          <div
            key={index}
            className={`form-card ${focusedSection === `grammar-${index}` ? 'focused' : ''} ${draggedGrammarIndex === index ? 'dragging' : ''}`}
            onClick={() => setFocusedSection(`grammar-${index}`)}
            draggable
            onDragStart={() => handleGrammarDragStart(index)}
            onDragOver={e => handleGrammarDragOver(e, index)}
            onDragEnd={handleGrammarDragEnd}
          >
            <div className="card-header">
              <i className="bi bi-grip-vertical drag-handle"></i>
              <span className="card-number">{index + 1}</span>
              <i className="bi bi-book card-icon"></i>
            </div>

            <div className="card-body">
              <div className="form-field">
                <input
                  type="text"
                  value={grammar.title}
                  onChange={e => updateGrammar(index, 'title', e.target.value)}
                  placeholder="Grammar title"
                  className="field-input"
                />
                <div className="field-underline"></div>
              </div>

              <div className="form-field">
                <textarea
                  value={grammar.contentMarkdown}
                  onChange={e => updateGrammar(index, 'contentMarkdown', e.target.value)}
                  placeholder="Content (Markdown supported)"
                  className="field-textarea"
                  rows={6}
                />
                <div className="field-underline"></div>
                <span className="field-hint">Hỗ trợ Markdown: **bold**, *italic*, # heading</span>
              </div>

              <div className="form-field">
                <textarea
                  value={grammar.exampleUsage}
                  onChange={e => updateGrammar(index, 'exampleUsage', e.target.value)}
                  placeholder="Example usage"
                  className="field-textarea"
                  rows={4}
                />
                <div className="field-underline"></div>
                <span className="field-hint">Các ví dụ sử dụng</span>
              </div>

              <div className="form-field">
                <input
                  type="number"
                  value={grammar.orderIndex}
                  onChange={e => updateGrammar(index, 'orderIndex', parseInt(e.target.value, 10))}
                  placeholder="Order"
                  className="field-input"
                />
                <div className="field-underline"></div>
              </div>
            </div>

            <div className="card-footer">
              <button className="action-btn" onClick={() => duplicateGrammar(index)}>
                <i className="bi bi-files"></i>
              </button>
              <button className="action-btn delete" onClick={() => deleteGrammar(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <button className="add-section-btn" onClick={addGrammar}>
          <i className="bi bi-plus-circle"></i> Add Grammar
        </button>

        {/* Question Section */}
        <div className="section-divider">
          <div className="divider-line"></div>
          <h3 className="section-title">
            <i className="bi bi-question-circle"></i> Questions
          </h3>
          <div className="divider-line"></div>
        </div>

        {questions.map((question, index) => (
          <div
            key={index}
            className={`form-card ${focusedSection === `question-${index}` ? 'focused' : ''} ${draggedQuestionIndex === index ? 'dragging' : ''}`}
            onClick={() => setFocusedSection(`question-${index}` as any)}
            draggable
            onDragStart={() => handleQuestionDragStart(index)}
            onDragOver={e => handleQuestionDragOver(e, index)}
            onDragEnd={handleQuestionDragEnd}
          >
            <div className="card-header">
              <span className="card-number">{index + 1}</span>
              <i className="bi bi-question-circle card-icon"></i>
              <i className="bi bi-grip-vertical drag-handle"></i>
              <select
                value={question.exerciseType}
                onChange={e => updateQuestion(index, 'exerciseType', e.target.value as ExerciseType)}
                className="question-type-select"
              >
                <option value={ExerciseType.SINGLE_CHOICE}>Single Choice</option>
                <option value={ExerciseType.MULTI_CHOICE}>Multiple Choice</option>
                <option value={ExerciseType.FILL_IN_BLANK}>Fill in Blank</option>
              </select>
            </div>

            <div className="card-body">
              <div className="form-field">
                <textarea
                  value={question.exerciseText}
                  onChange={e => updateQuestion(index, 'exerciseText', e.target.value)}
                  placeholder="Question text"
                  className="field-textarea"
                  rows={3}
                />
                <div className="field-underline"></div>
              </div>

              {question.exerciseType !== ExerciseType.FILL_IN_BLANK && question.id && (
                <div className="options-section">
                  {(questionOptions[question.id] || []).map((option, optIndex) => (
                    <div key={optIndex} className="option-item">
                      <input
                        type={question.exerciseType === ExerciseType.SINGLE_CHOICE ? 'radio' : 'checkbox'}
                        checked={option.isCorrect}
                        onChange={e => updateOption(question.id, optIndex, 'isCorrect', e.target.checked)}
                        className="option-radio"
                      />
                      <input
                        type="text"
                        value={option.optionText}
                        onChange={e => updateOption(question.id, optIndex, 'optionText', e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        className="option-input"
                      />
                      <button className="option-delete" onClick={() => deleteOption(question.id, optIndex)}>
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
                  <button className="add-option-btn" onClick={() => addOption(index)}>
                    <i className="bi bi-plus"></i> Add option
                  </button>
                </div>
              )}

              {question.exerciseType === ExerciseType.FILL_IN_BLANK && (
                <div className="form-field">
                  <input
                    placeholder="Enter correct answer..."
                    value={question.correctAnswerRaw}
                    onChange={e => updateQuestion(index, 'correctAnswerRaw', e.target.value)}
                    className="field-input"
                  />
                  <div className="field-underline"></div>
                </div>
              )}

              <div className="form-row-2">
                <div className="form-field">
                  <input
                    type="text"
                    value={question.imageUrl}
                    onChange={e => updateQuestion(index, 'imageUrl', e.target.value)}
                    placeholder="Image URL (optional)"
                    className="field-input small"
                  />
                  <div className="field-underline"></div>
                </div>
                <div className="form-field">
                  <input
                    type="text"
                    value={question.audioUrl}
                    onChange={e => updateQuestion(index, 'audioUrl', e.target.value)}
                    placeholder="Audio URL (optional)"
                    className="field-input small"
                  />
                  <div className="field-underline"></div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="action-btn" onClick={() => duplicateQuestion(index)}>
                <i className="bi bi-files"></i>
              </button>
              <button className="action-btn delete" onClick={() => deleteQuestion(index)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="add-question-menu">
          <button className="add-section-btn" onClick={() => addQuestion(ExerciseType.SINGLE_CHOICE)}>
            <i className="bi bi-plus-circle"></i> Add Question
          </button>
          <div className="question-type-buttons">
            <button onClick={() => addQuestion(ExerciseType.SINGLE_CHOICE)} className="type-btn">
              <i className="bi bi-record-circle"></i> Single Choice
            </button>
            <button onClick={() => addQuestion(ExerciseType.MULTI_CHOICE)} className="type-btn">
              <i className="bi bi-check-square"></i> Multi Choice
            </button>
            <button onClick={() => addQuestion(ExerciseType.FILL_IN_BLANK)} className="type-btn">
              <i className="bi bi-dash-square"></i> Fill in Blank
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitUpdateV2;
