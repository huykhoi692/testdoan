import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../config/store';

import { getEntity } from './reading-option.reducer';

export const ReadingOptionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const readingOptionEntity = useAppSelector(state => state.readingOption.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="readingOptionDetailsHeading">
          <Translate contentKey="langleagueApp.readingOption.detail.title">ReadingOption</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{readingOptionEntity.id}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="langleagueApp.readingOption.label">Label</Translate>
            </span>
          </dt>
          <dd>{readingOptionEntity.label}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="langleagueApp.readingOption.content">Content</Translate>
            </span>
          </dt>
          <dd>{readingOptionEntity.content}</dd>
          <dt>
            <span id="isCorrect">
              <Translate contentKey="langleagueApp.readingOption.isCorrect">Is Correct</Translate>
            </span>
          </dt>
          <dd>{readingOptionEntity.isCorrect ? 'true' : 'false'}</dd>
          <dt>
            <span id="orderIndex">
              <Translate contentKey="langleagueApp.readingOption.orderIndex">Order Index</Translate>
            </span>
          </dt>
          <dd>{readingOptionEntity.orderIndex}</dd>
          <dt>
            <Translate contentKey="langleagueApp.readingOption.readingExercise">Reading Exercise</Translate>
          </dt>
          <dd>{readingOptionEntity.readingExercise ? readingOptionEntity.readingExercise.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/reading-option" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reading-option/${readingOptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReadingOptionDetail;
