import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './study-session.reducer';

export const StudySessionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const studySessionEntity = useAppSelector(state => state.studySession.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="studySessionDetailsHeading">
          <Translate contentKey="langleagueApp.studySession.detail.title">StudySession</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{studySessionEntity.id}</dd>
          <dt>
            <span id="startAt">
              <Translate contentKey="langleagueApp.studySession.startAt">Start At</Translate>
            </span>
          </dt>
          <dd>
            {studySessionEntity.startAt ? <TextFormat value={studySessionEntity.startAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endAt">
              <Translate contentKey="langleagueApp.studySession.endAt">End At</Translate>
            </span>
          </dt>
          <dd>{studySessionEntity.endAt ? <TextFormat value={studySessionEntity.endAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="durationMinutes">
              <Translate contentKey="langleagueApp.studySession.durationMinutes">Duration Minutes</Translate>
            </span>
          </dt>
          <dd>{studySessionEntity.durationMinutes}</dd>
          <dt>
            <Translate contentKey="langleagueApp.studySession.appUser">App User</Translate>
          </dt>
          <dd>{studySessionEntity.appUser ? studySessionEntity.appUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/study-session" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/study-session/${studySessionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StudySessionDetail;
