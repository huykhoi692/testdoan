import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './writing-exercise.reducer';

export const WritingExerciseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const writingExerciseEntity = useAppSelector(state => state.writingExercise.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="writingExerciseDetailsHeading">
          <Translate contentKey="langleagueApp.writingExercise.detail.title">WritingExercise</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{writingExerciseEntity.id}</dd>
          <dt>
            <span id="prompt">
              <Translate contentKey="langleagueApp.writingExercise.prompt">Prompt</Translate>
            </span>
          </dt>
          <dd>{writingExerciseEntity.prompt}</dd>
          <dt>
            <span id="sampleAnswer">
              <Translate contentKey="langleagueApp.writingExercise.sampleAnswer">Sample Answer</Translate>
            </span>
          </dt>
          <dd>{writingExerciseEntity.sampleAnswer}</dd>
          <dt>
            <span id="maxScore">
              <Translate contentKey="langleagueApp.writingExercise.maxScore">Max Score</Translate>
            </span>
          </dt>
          <dd>{writingExerciseEntity.maxScore}</dd>
          <dt>
            <Translate contentKey="langleagueApp.writingExercise.chapter">Chapter</Translate>
          </dt>
          <dd>{writingExerciseEntity.chapter ? writingExerciseEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/writing-exercise" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/writing-exercise/${writingExerciseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WritingExerciseDetail;
