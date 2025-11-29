import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './speaking-exercise.reducer';

export const SpeakingExerciseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const speakingExerciseEntity = useAppSelector(state => state.speakingExercise.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="speakingExerciseDetailsHeading">
          <Translate contentKey="langleagueApp.speakingExercise.detail.title">SpeakingExercise</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{speakingExerciseEntity.id}</dd>
          <dt>
            <span id="prompt">
              <Translate contentKey="langleagueApp.speakingExercise.prompt">Prompt</Translate>
            </span>
          </dt>
          <dd>{speakingExerciseEntity.prompt}</dd>
          <dt>
            <span id="sampleAudio">
              <Translate contentKey="langleagueApp.speakingExercise.sampleAudio">Sample Audio</Translate>
            </span>
          </dt>
          <dd>{speakingExerciseEntity.sampleAudio}</dd>
          <dt>
            <span id="maxScore">
              <Translate contentKey="langleagueApp.speakingExercise.maxScore">Max Score</Translate>
            </span>
          </dt>
          <dd>{speakingExerciseEntity.maxScore}</dd>
          <dt>
            <Translate contentKey="langleagueApp.speakingExercise.chapter">Chapter</Translate>
          </dt>
          <dd>{speakingExerciseEntity.chapter ? speakingExerciseEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/speaking-exercise" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/speaking-exercise/${speakingExerciseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SpeakingExerciseDetail;
