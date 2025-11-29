import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './word.reducer';

export const WordDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const wordEntity = useAppSelector(state => state.word.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="wordDetailsHeading">
          <Translate contentKey="langleagueApp.word.detail.title">Word</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{wordEntity.id}</dd>
          <dt>
            <span id="text">
              <Translate contentKey="langleagueApp.word.text">Text</Translate>
            </span>
          </dt>
          <dd>{wordEntity.text}</dd>
          <dt>
            <span id="meaning">
              <Translate contentKey="langleagueApp.word.meaning">Meaning</Translate>
            </span>
          </dt>
          <dd>{wordEntity.meaning}</dd>
          <dt>
            <span id="pronunciation">
              <Translate contentKey="langleagueApp.word.pronunciation">Pronunciation</Translate>
            </span>
          </dt>
          <dd>{wordEntity.pronunciation}</dd>
          <dt>
            <span id="partOfSpeech">
              <Translate contentKey="langleagueApp.word.partOfSpeech">Part Of Speech</Translate>
            </span>
          </dt>
          <dd>{wordEntity.partOfSpeech}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="langleagueApp.word.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{wordEntity.imageUrl}</dd>
          <dt>
            <Translate contentKey="langleagueApp.word.chapter">Chapter</Translate>
          </dt>
          <dd>{wordEntity.chapter ? wordEntity.chapter.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/word" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/word/${wordEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WordDetail;
