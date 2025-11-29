import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book-progress.reducer';

export const BookProgressDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const bookProgressEntity = useAppSelector(state => state.bookProgress.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookProgressDetailsHeading">
          <Translate contentKey="langleagueApp.bookProgress.detail.title">BookProgress</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bookProgressEntity.id}</dd>
          <dt>
            <span id="percent">
              <Translate contentKey="langleagueApp.bookProgress.percent">Percent</Translate>
            </span>
          </dt>
          <dd>{bookProgressEntity.percent}</dd>
          <dt>
            <span id="lastAccessed">
              <Translate contentKey="langleagueApp.bookProgress.lastAccessed">Last Accessed</Translate>
            </span>
          </dt>
          <dd>
            {bookProgressEntity.lastAccessed ? (
              <TextFormat value={bookProgressEntity.lastAccessed} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="completed">
              <Translate contentKey="langleagueApp.bookProgress.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{bookProgressEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="langleagueApp.bookProgress.appUser">App User</Translate>
          </dt>
          <dd>{bookProgressEntity.appUser ? bookProgressEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.bookProgress.book">Book</Translate>
          </dt>
          <dd>{bookProgressEntity.book ? bookProgressEntity.book.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/book-progress" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-progress/${bookProgressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookProgressDetail;
