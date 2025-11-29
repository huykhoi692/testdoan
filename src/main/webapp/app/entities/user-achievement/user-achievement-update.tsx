import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getAchievements } from 'app/entities/achievement/achievement.reducer';
import { createEntity, getEntity, reset, updateEntity } from './user-achievement.reducer';

export const UserAchievementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const achievements = useAppSelector(state => state.achievement.entities);
  const userAchievementEntity = useAppSelector(state => state.userAchievement.entity);
  const loading = useAppSelector(state => state.userAchievement.loading);
  const updating = useAppSelector(state => state.userAchievement.updating);
  const updateSuccess = useAppSelector(state => state.userAchievement.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/user-achievement${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getAchievements({}));
  }, [dispatch, id, isNew]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess, handleClose]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.awardedTo = convertDateTimeToServer(values.awardedTo);

    const entity = {
      ...userAchievementEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      achievement: achievements.find(it => it.id.toString() === values.achievement?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          awardedTo: displayDefaultDateTime(),
        }
      : {
          ...userAchievementEntity,
          awardedTo: convertDateTimeFromServer(userAchievementEntity.awardedTo),
          appUser: userAchievementEntity?.appUser?.id,
          achievement: userAchievementEntity?.achievement?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.userAchievement.home.createOrEditLabel" data-cy="UserAchievementCreateUpdateHeading">
            <Translate contentKey="langleagueApp.userAchievement.home.createOrEditLabel">Create or edit a UserAchievement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-achievement-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.userAchievement.awardedTo')}
                id="user-achievement-awardedTo"
                name="awardedTo"
                data-cy="awardedTo"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="user-achievement-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.userAchievement.appUser')}
                type="select"
              >
                <option value="" key="0" />
                {appUsers
                  ? appUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="user-achievement-achievement"
                name="achievement"
                data-cy="achievement"
                label={translate('langleagueApp.userAchievement.achievement')}
                type="select"
              >
                <option value="" key="0" />
                {achievements
                  ? achievements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-achievement" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserAchievementUpdate;
