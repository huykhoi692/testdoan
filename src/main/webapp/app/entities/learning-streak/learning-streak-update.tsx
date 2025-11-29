import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { createEntity, getEntity, reset, updateEntity } from './learning-streak.reducer';

export const LearningStreakUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const learningStreakEntity = useAppSelector(state => state.learningStreak.entity);
  const loading = useAppSelector(state => state.learningStreak.loading);
  const updating = useAppSelector(state => state.learningStreak.updating);
  const updateSuccess = useAppSelector(state => state.learningStreak.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/learning-streak${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
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
    if (values.currentStreak !== undefined && typeof values.currentStreak !== 'number') {
      values.currentStreak = Number(values.currentStreak);
    }
    if (values.longestStreak !== undefined && typeof values.longestStreak !== 'number') {
      values.longestStreak = Number(values.longestStreak);
    }
    values.lastStudyDate = convertDateTimeToServer(values.lastStudyDate);

    const entity = {
      ...learningStreakEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
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
          lastStudyDate: displayDefaultDateTime(),
        }
      : {
          ...learningStreakEntity,
          lastStudyDate: convertDateTimeFromServer(learningStreakEntity.lastStudyDate),
          appUser: learningStreakEntity?.appUser?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.learningStreak.home.createOrEditLabel" data-cy="LearningStreakCreateUpdateHeading">
            <Translate contentKey="langleagueApp.learningStreak.home.createOrEditLabel">Create or edit a LearningStreak</Translate>
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
                  id="learning-streak-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.learningStreak.currentStreak')}
                id="learning-streak-currentStreak"
                name="currentStreak"
                data-cy="currentStreak"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.learningStreak.longestStreak')}
                id="learning-streak-longestStreak"
                name="longestStreak"
                data-cy="longestStreak"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.learningStreak.lastStudyDate')}
                id="learning-streak-lastStudyDate"
                name="lastStudyDate"
                data-cy="lastStudyDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.learningStreak.iconUrl')}
                id="learning-streak-iconUrl"
                name="iconUrl"
                data-cy="iconUrl"
                type="text"
                validate={{
                  maxLength: { value: 256, message: translate('entity.validation.maxlength', { max: 256 }) },
                }}
              />
              <ValidatedField
                id="learning-streak-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.learningStreak.appUser')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/learning-streak" replace color="info">
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

export default LearningStreakUpdate;
