import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-grammar.reducer';

export const UserGrammarDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const userGrammarEntity = useAppSelector(state => state.userGrammar.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userGrammarDetailsHeading">
          <Translate contentKey="langleagueApp.userGrammar.detail.title">UserGrammar</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userGrammarEntity.id}</dd>
          <dt>
            <span id="remembered">
              <Translate contentKey="langleagueApp.userGrammar.remembered">Remembered</Translate>
            </span>
          </dt>
          <dd>{userGrammarEntity.remembered ? 'true' : 'false'}</dd>
          <dt>
            <span id="isMemorized">
              <Translate contentKey="langleagueApp.userGrammar.isMemorized">Is Memorized</Translate>
            </span>
          </dt>
          <dd>{userGrammarEntity.isMemorized ? 'true' : 'false'}</dd>
          <dt>
            <span id="lastReviewed">
              <Translate contentKey="langleagueApp.userGrammar.lastReviewed">Last Reviewed</Translate>
            </span>
          </dt>
          <dd>
            {userGrammarEntity.lastReviewed ? (
              <TextFormat value={userGrammarEntity.lastReviewed} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reviewCount">
              <Translate contentKey="langleagueApp.userGrammar.reviewCount">Review Count</Translate>
            </span>
          </dt>
          <dd>{userGrammarEntity.reviewCount}</dd>
          <dt>
            <Translate contentKey="langleagueApp.userGrammar.appUser">App User</Translate>
          </dt>
          <dd>{userGrammarEntity.appUser ? userGrammarEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.userGrammar.grammar">Grammar</Translate>
          </dt>
          <dd>{userGrammarEntity.grammar ? userGrammarEntity.grammar.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-grammar" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-grammar/${userGrammarEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserGrammarDetail;
