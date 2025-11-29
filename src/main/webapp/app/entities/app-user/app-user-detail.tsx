import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './app-user.reducer';

export const AppUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const appUserEntity = useAppSelector(state => state.appUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="appUserDetailsHeading">
          <Translate contentKey="langleagueApp.appUser.detail.title">AppUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{appUserEntity.id}</dd>
          <dt>
            <span id="displayName">
              <Translate contentKey="langleagueApp.appUser.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{appUserEntity.displayName}</dd>
          <dt>
            <span id="avatarUrl">
              <Translate contentKey="langleagueApp.appUser.avatarUrl">Avatar Url</Translate>
            </span>
          </dt>
          <dd>{appUserEntity.avatarUrl}</dd>
          <dt>
            <span id="bio">
              <Translate contentKey="langleagueApp.appUser.bio">Bio</Translate>
            </span>
          </dt>
          <dd>{appUserEntity.bio}</dd>
          <dt>
            <Translate contentKey="langleagueApp.appUser.internalUser">Internal User</Translate>
          </dt>
          <dd>{appUserEntity.internalUser ? appUserEntity.internalUser.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/app-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/app-user/${appUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AppUserDetail;
