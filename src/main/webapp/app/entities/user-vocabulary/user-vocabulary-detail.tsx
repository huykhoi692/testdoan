import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-vocabulary.reducer';

export const UserVocabularyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const userVocabularyEntity = useAppSelector(state => state.userVocabulary.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userVocabularyDetailsHeading">
          <Translate contentKey="langleagueApp.userVocabulary.detail.title">UserVocabulary</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userVocabularyEntity.id}</dd>
          <dt>
            <span id="remembered">
              <Translate contentKey="langleagueApp.userVocabulary.remembered">Remembered</Translate>
            </span>
          </dt>
          <dd>{userVocabularyEntity.remembered ? 'true' : 'false'}</dd>
          <dt>
            <span id="isMemorized">
              <Translate contentKey="langleagueApp.userVocabulary.isMemorized">Is Memorized</Translate>
            </span>
          </dt>
          <dd>{userVocabularyEntity.isMemorized ? 'true' : 'false'}</dd>
          <dt>
            <span id="lastReviewed">
              <Translate contentKey="langleagueApp.userVocabulary.lastReviewed">Last Reviewed</Translate>
            </span>
          </dt>
          <dd>
            {userVocabularyEntity.lastReviewed ? (
              <TextFormat value={userVocabularyEntity.lastReviewed} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reviewCount">
              <Translate contentKey="langleagueApp.userVocabulary.reviewCount">Review Count</Translate>
            </span>
          </dt>
          <dd>{userVocabularyEntity.reviewCount}</dd>
          <dt>
            <Translate contentKey="langleagueApp.userVocabulary.appUser">App User</Translate>
          </dt>
          <dd>{userVocabularyEntity.appUser ? userVocabularyEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.userVocabulary.word">Word</Translate>
          </dt>
          <dd>{userVocabularyEntity.word ? userVocabularyEntity.word.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-vocabulary" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-vocabulary/${userVocabularyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserVocabularyDetail;
