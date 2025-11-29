import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './exercise-result.reducer';

export const ExerciseResultDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const exerciseResultEntity = useAppSelector(state => state.exerciseResult.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="exerciseResultDetailsHeading">
          <Translate contentKey="langleagueApp.exerciseResult.detail.title">ExerciseResult</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{exerciseResultEntity.id}</dd>
          <dt>
            <span id="exerciseType">
              <Translate contentKey="langleagueApp.exerciseResult.exerciseType">Exercise Type</Translate>
            </span>
          </dt>
          <dd>{exerciseResultEntity.exerciseType}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="langleagueApp.exerciseResult.score">Score</Translate>
            </span>
          </dt>
          <dd>{exerciseResultEntity.score}</dd>
          <dt>
            <span id="userAnswer">
              <Translate contentKey="langleagueApp.exerciseResult.userAnswer">User Answer</Translate>
            </span>
          </dt>
          <dd>{exerciseResultEntity.userAnswer}</dd>
          <dt>
            <span id="submittedAt">
              <Translate contentKey="langleagueApp.exerciseResult.submittedAt">Submitted At</Translate>
            </span>
          </dt>
          <dd>
            {exerciseResultEntity.submittedAt ? (
              <TextFormat value={exerciseResultEntity.submittedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="langleagueApp.exerciseResult.appUser">App User</Translate>
          </dt>
          <dd>{exerciseResultEntity.appUser ? exerciseResultEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.exerciseResult.listeningExercise">Listening Exercise</Translate>
          </dt>
          <dd>{exerciseResultEntity.listeningExercise ? exerciseResultEntity.listeningExercise.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.exerciseResult.speakingExercise">Speaking Exercise</Translate>
          </dt>
          <dd>{exerciseResultEntity.speakingExercise ? exerciseResultEntity.speakingExercise.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.exerciseResult.readingExercise">Reading Exercise</Translate>
          </dt>
          <dd>{exerciseResultEntity.readingExercise ? exerciseResultEntity.readingExercise.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.exerciseResult.writingExercise">Writing Exercise</Translate>
          </dt>
          <dd>{exerciseResultEntity.writingExercise ? exerciseResultEntity.writingExercise.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/exercise-result" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/exercise-result/${exerciseResultEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExerciseResultDetail;
