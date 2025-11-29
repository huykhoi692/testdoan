import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './chapter-progress.reducer';

export const ChapterProgressDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const chapterProgressEntity = useAppSelector(state => state.chapterProgress.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="chapterProgressDetailsHeading">
          <Translate contentKey="langleagueApp.chapterProgress.detail.title">ChapterProgress</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{chapterProgressEntity.id}</dd>
          <dt>
            <span id="percent">
              <Translate contentKey="langleagueApp.chapterProgress.percent">Percent</Translate>
            </span>
          </dt>
          <dd>{chapterProgressEntity.percent}</dd>
          <dt>
            <span id="lastAccessed">
              <Translate contentKey="langleagueApp.chapterProgress.lastAccessed">Last Accessed</Translate>
            </span>
          </dt>
          <dd>
            {chapterProgressEntity.lastAccessed ? (
              <TextFormat value={chapterProgressEntity.lastAccessed} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="completed">
              <Translate contentKey="langleagueApp.chapterProgress.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{chapterProgressEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="langleagueApp.chapterProgress.appUser">App User</Translate>
          </dt>
          <dd>{chapterProgressEntity.appUser ? chapterProgressEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.chapterProgress.chapter">Chapter</Translate>
          </dt>
          <dd>{chapterProgressEntity.chapter ? chapterProgressEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/chapter-progress" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/chapter-progress/${chapterProgressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ChapterProgressDetail;
