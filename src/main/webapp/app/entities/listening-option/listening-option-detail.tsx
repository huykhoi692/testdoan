import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../config/store';

import { getEntity } from './listening-option.reducer';

export const ListeningOptionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const listeningOptionEntity = useAppSelector(state => state.listeningOption.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="listeningOptionDetailsHeading">
          <Translate contentKey="langleagueApp.listeningOption.detail.title">ListeningOption</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{listeningOptionEntity.id}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="langleagueApp.listeningOption.label">Label</Translate>
            </span>
          </dt>
          <dd>{listeningOptionEntity.label}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="langleagueApp.listeningOption.content">Content</Translate>
            </span>
          </dt>
          <dd>{listeningOptionEntity.content}</dd>
          <dt>
            <span id="isCorrect">
              <Translate contentKey="langleagueApp.listeningOption.isCorrect">Is Correct</Translate>
            </span>
          </dt>
          <dd>{listeningOptionEntity.isCorrect ? 'true' : 'false'}</dd>
          <dt>
            <span id="orderIndex">
              <Translate contentKey="langleagueApp.listeningOption.orderIndex">Order Index</Translate>
            </span>
          </dt>
          <dd>{listeningOptionEntity.orderIndex}</dd>
          <dt>
            <Translate contentKey="langleagueApp.listeningOption.listeningExercise">Listening Exercise</Translate>
          </dt>
          <dd>{listeningOptionEntity.listeningExercise ? listeningOptionEntity.listeningExercise.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/listening-option" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/listening-option/${listeningOptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ListeningOptionDetail;
