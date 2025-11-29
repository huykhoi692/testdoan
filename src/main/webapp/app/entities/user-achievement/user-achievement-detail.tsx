import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-achievement.reducer';

export const UserAchievementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const userAchievementEntity = useAppSelector(state => state.userAchievement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userAchievementDetailsHeading">
          <Translate contentKey="langleagueApp.userAchievement.detail.title">UserAchievement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userAchievementEntity.id}</dd>
          <dt>
            <span id="awardedTo">
              <Translate contentKey="langleagueApp.userAchievement.awardedTo">Awarded To</Translate>
            </span>
          </dt>
          <dd>
            {userAchievementEntity.awardedTo ? (
              <TextFormat value={userAchievementEntity.awardedTo} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="langleagueApp.userAchievement.appUser">App User</Translate>
          </dt>
          <dd>{userAchievementEntity.appUser ? userAchievementEntity.appUser.id : ''}</dd>
          <dt>
            <Translate contentKey="langleagueApp.userAchievement.achievement">Achievement</Translate>
          </dt>
          <dd>{userAchievementEntity.achievement ? userAchievementEntity.achievement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-achievement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-achievement/${userAchievementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserAchievementDetail;
