import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book-review.reducer';

export const BookReviewDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const bookReviewEntity = useAppSelector(state => state.bookReview.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookReviewDetailsHeading">
          <Translate contentKey="langleagueApp.bookReview.detail.title">BookReview</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bookReviewEntity.id}</dd>
          <dt>
            <span id="rating">
              <Translate contentKey="langleagueApp.bookReview.rating">Rating</Translate>
            </span>
          </dt>
          <dd>{bookReviewEntity.rating}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="langleagueApp.bookReview.title">Title</Translate>
            </span>
          </dt>
          <dd>{bookReviewEntity.title}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="langleagueApp.bookReview.content">Content</Translate>
            </span>
          </dt>
          <dd>{bookReviewEntity.content}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="langleagueApp.bookReview.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {bookReviewEntity.createdAt ? <TextFormat value={bookReviewEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="langleagueApp.bookReview.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {bookReviewEntity.updatedAt ? <TextFormat value={bookReviewEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="langleagueApp.bookReview.appUser">App User</Translate>
          </dt>
          <dd>{bookReviewEntity.appUser ? bookReviewEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.bookReview.book">Book</Translate>
          </dt>
          <dd>{bookReviewEntity.book ? bookReviewEntity.book.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/book-review" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-review/${bookReviewEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookReviewDetail;
