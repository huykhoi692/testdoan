import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './grammar-example.reducer';

export const GrammarExampleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const grammarExampleEntity = useAppSelector(state => state.grammarExample.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="grammarExampleDetailsHeading">
          <Translate contentKey="langleagueApp.grammarExample.detail.title">GrammarExample</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{grammarExampleEntity.id}</dd>
          <dt>
            <span id="exampleText">
              <Translate contentKey="langleagueApp.grammarExample.exampleText">Example Text</Translate>
            </span>
          </dt>
          <dd>{grammarExampleEntity.exampleText}</dd>
          <dt>
            <span id="translation">
              <Translate contentKey="langleagueApp.grammarExample.translation">Translation</Translate>
            </span>
          </dt>
          <dd>{grammarExampleEntity.translation}</dd>
          <dt>
            <span id="explanation">
              <Translate contentKey="langleagueApp.grammarExample.explanation">Explanation</Translate>
            </span>
          </dt>
          <dd>{grammarExampleEntity.explanation}</dd>
          <dt>
            <Translate contentKey="langleagueApp.grammarExample.grammar">Grammar</Translate>
          </dt>
          <dd>{grammarExampleEntity.grammar ? grammarExampleEntity.grammar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/grammar-example" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/grammar-example/${grammarExampleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GrammarExampleDetail;
