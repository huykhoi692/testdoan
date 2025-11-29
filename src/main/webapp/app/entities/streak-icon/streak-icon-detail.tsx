import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './streak-icon.reducer';

export const StreakIconDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const streakIconEntity = useAppSelector(state => state.streakIcon.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="streakIconDetailsHeading">
          <Translate contentKey="langleagueApp.streakIcon.detail.title">StreakIcon</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{streakIconEntity.id}</dd>
          <dt>
            <span id="level">
              <Translate contentKey="langleagueApp.streakIcon.level">Level</Translate>
            </span>
          </dt>
          <dd>{streakIconEntity.level}</dd>
          <dt>
            <span id="minDays">
              <Translate contentKey="langleagueApp.streakIcon.minDays">Min Days</Translate>
            </span>
          </dt>
          <dd>{streakIconEntity.minDays}</dd>
          <dt>
            <span id="iconPath">
              <Translate contentKey="langleagueApp.streakIcon.iconPath">Icon Path</Translate>
            </span>
          </dt>
          <dd>{streakIconEntity.iconPath}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="langleagueApp.streakIcon.description">Description</Translate>
            </span>
          </dt>
          <dd>{streakIconEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/streak-icon" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/streak-icon/${streakIconEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StreakIconDetail;
