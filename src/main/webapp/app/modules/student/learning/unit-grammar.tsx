import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { IUnit } from 'app/shared/model/unit.model';
import { IGrammar } from 'app/shared/model/grammar.model';

export const UnitGrammar = () => {
  const [unit, setUnit] = useState<IUnit | null>(null);
  const [grammars, setGrammars] = useState<IGrammar[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<IGrammar | null>(null);
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (unitId) {
      loadUnit();
      loadGrammars();
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

  const loadGrammars = async () => {
    try {
      const response = await axios.get(`/api/grammars?unitId.equals=${unitId}&sort=orderIndex,asc`);
      setGrammars(response.data);
      if (response.data.length > 0) {
        setSelectedGrammar(response.data[0]);
      }
    } catch (error) {
      console.error('Error loading grammars:', error);
    }
  };

  // Removed parseExamples as we treat exampleUsage as markdown/text now

  return (
    <div className="unit-grammar">
      <div className="grammar-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Book List
        </button>
        <div className="header-info">
          <div className="breadcrumb">
            <span>UNIT 1 - GRAMMAR</span>
          </div>
          <h2>{unit?.title || 'Grammar'}</h2>
        </div>
      </div>

      <div className="grammar-content">
        {selectedGrammar && (
          <div className="grammar-detail">
            <h3>{selectedGrammar.title}</h3>

            {/* Structure section removed as it's not present in backend model */}
            {/* {selectedGrammar.structure && (...)} */}

            {selectedGrammar.contentMarkdown && (
              <div className="grammar-section">
                <div className="section-header">
                  <span className="section-icon">📖</span>
                  <h4>Definition</h4>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown>{selectedGrammar.contentMarkdown}</ReactMarkdown>
                </div>
              </div>
            )}

            {selectedGrammar.exampleUsage && (
              <div className="grammar-section">
                <div className="section-header">
                  <span className="section-icon">💡</span>
                  <h4>Examples</h4>
                </div>
                <div className="markdown-content">
                  {/* Render examples as Markdown or text */}
                  <ReactMarkdown>{selectedGrammar.exampleUsage}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}

        {grammars.length === 0 && (
          <div className="empty-state">
            <p>No grammar lessons added yet for this unit.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitGrammar;
