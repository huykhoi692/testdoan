import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './achievement.reducer';

export const AchievementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const achievementEntity = useAppSelector(state => state.achievement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="achievementDetailsHeading">
          <Translate contentKey="langleagueApp.achievement.detail.title">Achievement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{achievementEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="langleagueApp.achievement.title">Title</Translate>
            </span>
          </dt>
          <dd>{achievementEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="langleagueApp.achievement.description">Description</Translate>
            </span>
          </dt>
          <dd>{achievementEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/achievement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/achievement/${achievementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AchievementDetail;
