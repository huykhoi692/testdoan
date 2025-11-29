import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { createEntity, getEntity, reset, updateEntity } from './study-session.reducer';

export const StudySessionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const studySessionEntity = useAppSelector(state => state.studySession.entity);
  const loading = useAppSelector(state => state.studySession.loading);
  const updating = useAppSelector(state => state.studySession.updating);
  const updateSuccess = useAppSelector(state => state.studySession.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/study-session${location.search}`);
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
    values.startAt = convertDateTimeToServer(values.startAt);
    values.endAt = convertDateTimeToServer(values.endAt);
    if (values.durationMinutes !== undefined && typeof values.durationMinutes !== 'number') {
      values.durationMinutes = Number(values.durationMinutes);
    }

    const entity = {
      ...studySessionEntity,
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
          startAt: displayDefaultDateTime(),
          endAt: displayDefaultDateTime(),
        }
      : {
          ...studySessionEntity,
          startAt: convertDateTimeFromServer(studySessionEntity.startAt),
          endAt: convertDateTimeFromServer(studySessionEntity.endAt),
          appUser: studySessionEntity?.appUser?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.studySession.home.createOrEditLabel" data-cy="StudySessionCreateUpdateHeading">
            <Translate contentKey="langleagueApp.studySession.home.createOrEditLabel">Create or edit a StudySession</Translate>
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
                  id="study-session-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.studySession.startAt')}
                id="study-session-startAt"
                name="startAt"
                data-cy="startAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.studySession.endAt')}
                id="study-session-endAt"
                name="endAt"
                data-cy="endAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.studySession.durationMinutes')}
                id="study-session-durationMinutes"
                name="durationMinutes"
                data-cy="durationMinutes"
                type="text"
              />
              <ValidatedField
                id="study-session-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.studySession.appUser')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/study-session" replace color="info">
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

export default StudySessionUpdate;
