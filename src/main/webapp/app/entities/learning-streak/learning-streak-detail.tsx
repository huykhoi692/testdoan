import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './learning-streak.reducer';

export const LearningStreakDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const learningStreakEntity = useAppSelector(state => state.learningStreak.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="learningStreakDetailsHeading">
          <Translate contentKey="langleagueApp.learningStreak.detail.title">LearningStreak</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{learningStreakEntity.id}</dd>
          <dt>
            <span id="currentStreak">
              <Translate contentKey="langleagueApp.learningStreak.currentStreak">Current Streak</Translate>
            </span>
          </dt>
          <dd>{learningStreakEntity.currentStreak}</dd>
          <dt>
            <span id="longestStreak">
              <Translate contentKey="langleagueApp.learningStreak.longestStreak">Longest Streak</Translate>
            </span>
          </dt>
          <dd>{learningStreakEntity.longestStreak}</dd>
          <dt>
            <span id="lastStudyDate">
              <Translate contentKey="langleagueApp.learningStreak.lastStudyDate">Last Study Date</Translate>
            </span>
          </dt>
          <dd>
            {learningStreakEntity.lastStudyDate ? (
              <TextFormat value={learningStreakEntity.lastStudyDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="iconUrl">
              <Translate contentKey="langleagueApp.learningStreak.iconUrl">Icon Url</Translate>
            </span>
          </dt>
          <dd>{learningStreakEntity.iconUrl}</dd>
          <dt>
            <Translate contentKey="langleagueApp.learningStreak.appUser">App User</Translate>
          </dt>
          <dd>{learningStreakEntity.appUser ? learningStreakEntity.appUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/learning-streak" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/learning-streak/${learningStreakEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LearningStreakDetail;
