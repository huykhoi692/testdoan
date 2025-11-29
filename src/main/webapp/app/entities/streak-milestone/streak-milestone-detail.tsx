import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './streak-milestone.reducer';

export const StreakMilestoneDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const streakMilestoneEntity = useAppSelector(state => state.streakMilestone.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="streakMilestoneDetailsHeading">
          <Translate contentKey="langleagueApp.streakMilestone.detail.title">StreakMilestone</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{streakMilestoneEntity.id}</dd>
          <dt>
            <span id="milestoneDays">
              <Translate contentKey="langleagueApp.streakMilestone.milestoneDays">Milestone Days</Translate>
            </span>
          </dt>
          <dd>{streakMilestoneEntity.milestoneDays}</dd>
          <dt>
            <span id="rewardName">
              <Translate contentKey="langleagueApp.streakMilestone.rewardName">Reward Name</Translate>
            </span>
          </dt>
          <dd>{streakMilestoneEntity.rewardName}</dd>
          <dt>
            <Translate contentKey="langleagueApp.streakMilestone.studySession">Study Session</Translate>
          </dt>
          <dd>{streakMilestoneEntity.studySession ? streakMilestoneEntity.studySession.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/streak-milestone" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/streak-milestone/${streakMilestoneEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StreakMilestoneDetail;
