import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './word-example.reducer';

export const WordExampleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const wordExampleEntity = useAppSelector(state => state.wordExample.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="wordExampleDetailsHeading">
          <Translate contentKey="langleagueApp.wordExample.detail.title">WordExample</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{wordExampleEntity.id}</dd>
          <dt>
            <span id="exampleText">
              <Translate contentKey="langleagueApp.wordExample.exampleText">Example Text</Translate>
            </span>
          </dt>
          <dd>{wordExampleEntity.exampleText}</dd>
          <dt>
            <span id="translation">
              <Translate contentKey="langleagueApp.wordExample.translation">Translation</Translate>
            </span>
          </dt>
          <dd>{wordExampleEntity.translation}</dd>
          <dt>
            <Translate contentKey="langleagueApp.wordExample.word">Word</Translate>
          </dt>
          <dd>{wordExampleEntity.word ? wordExampleEntity.word.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/word-example" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/word-example/${wordExampleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WordExampleDetail;
