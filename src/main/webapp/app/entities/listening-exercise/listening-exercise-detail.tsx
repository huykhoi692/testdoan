import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './listening-exercise.reducer';

export const ListeningExerciseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const listeningExerciseEntity = useAppSelector(state => state.listeningExercise.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="listeningExerciseDetailsHeading">
          <Translate contentKey="langleagueApp.listeningExercise.detail.title">ListeningExercise</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.id}</dd>
          <dt>
            <span id="audioPath">
              <Translate contentKey="langleagueApp.listeningExercise.audioPath">Audio Path</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.audioPath}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="langleagueApp.listeningExercise.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.imageUrl}</dd>
          <dt>
            <span id="transcript">
              <Translate contentKey="langleagueApp.listeningExercise.transcript">Transcript</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.transcript}</dd>
          <dt>
            <span id="question">
              <Translate contentKey="langleagueApp.listeningExercise.question">Question</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.question}</dd>
          <dt>
            <span id="correctAnswer">
              <Translate contentKey="langleagueApp.listeningExercise.correctAnswer">Correct Answer</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.correctAnswer}</dd>
          <dt>
            <span id="maxScore">
              <Translate contentKey="langleagueApp.listeningExercise.maxScore">Max Score</Translate>
            </span>
          </dt>
          <dd>{listeningExerciseEntity.maxScore}</dd>
          <dt>
            <Translate contentKey="langleagueApp.listeningExercise.chapter">Chapter</Translate>
          </dt>
          <dd>{listeningExerciseEntity.chapter ? listeningExerciseEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/listening-exercise" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/listening-exercise/${listeningExerciseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ListeningExerciseDetail;
