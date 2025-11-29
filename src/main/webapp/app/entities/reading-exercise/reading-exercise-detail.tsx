import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './reading-exercise.reducer';

export const ReadingExerciseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const readingExerciseEntity = useAppSelector(state => state.readingExercise.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="readingExerciseDetailsHeading">
          <Translate contentKey="langleagueApp.readingExercise.detail.title">ReadingExercise</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{readingExerciseEntity.id}</dd>
          <dt>
            <span id="passage">
              <Translate contentKey="langleagueApp.readingExercise.passage">Passage</Translate>
            </span>
          </dt>
          <dd>{readingExerciseEntity.passage}</dd>
          <dt>
            <span id="question">
              <Translate contentKey="langleagueApp.readingExercise.question">Question</Translate>
            </span>
          </dt>
          <dd>{readingExerciseEntity.question}</dd>
          <dt>
            <span id="correctAnswer">
              <Translate contentKey="langleagueApp.readingExercise.correctAnswer">Correct Answer</Translate>
            </span>
          </dt>
          <dd>{readingExerciseEntity.correctAnswer}</dd>
          <dt>
            <span id="maxScore">
              <Translate contentKey="langleagueApp.readingExercise.maxScore">Max Score</Translate>
            </span>
          </dt>
          <dd>{readingExerciseEntity.maxScore}</dd>
          <dt>
            <Translate contentKey="langleagueApp.readingExercise.chapter">Chapter</Translate>
          </dt>
          <dd>{readingExerciseEntity.chapter ? readingExerciseEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reading-exercise" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reading-exercise/${readingExerciseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReadingExerciseDetail;
