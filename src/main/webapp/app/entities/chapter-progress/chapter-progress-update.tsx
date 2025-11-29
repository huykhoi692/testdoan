import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getChapters } from 'app/entities/chapter/chapter.reducer';
import { createEntity, getEntity, reset, updateEntity } from './chapter-progress.reducer';

export const ChapterProgressUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const chapters = useAppSelector(state => state.chapter.entities);
  const chapterProgressEntity = useAppSelector(state => state.chapterProgress.entity);
  const loading = useAppSelector(state => state.chapterProgress.loading);
  const updating = useAppSelector(state => state.chapterProgress.updating);
  const updateSuccess = useAppSelector(state => state.chapterProgress.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/chapter-progress${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getChapters({}));
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
    if (values.percent !== undefined && typeof values.percent !== 'number') {
      values.percent = Number(values.percent);
    }
    values.lastAccessed = convertDateTimeToServer(values.lastAccessed);

    const entity = {
      ...chapterProgressEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      chapter: chapters.find(it => it.id.toString() === values.chapter?.toString()),
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
          lastAccessed: displayDefaultDateTime(),
        }
      : {
          ...chapterProgressEntity,
          lastAccessed: convertDateTimeFromServer(chapterProgressEntity.lastAccessed),
          appUser: chapterProgressEntity?.appUser?.id,
          chapter: chapterProgressEntity?.chapter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.chapterProgress.home.createOrEditLabel" data-cy="ChapterProgressCreateUpdateHeading">
            <Translate contentKey="langleagueApp.chapterProgress.home.createOrEditLabel">Create or edit a ChapterProgress</Translate>
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
                  id="chapter-progress-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.chapterProgress.percent')}
                id="chapter-progress-percent"
                name="percent"
                data-cy="percent"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.chapterProgress.lastAccessed')}
                id="chapter-progress-lastAccessed"
                name="lastAccessed"
                data-cy="lastAccessed"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.chapterProgress.completed')}
                id="chapter-progress-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField
                id="chapter-progress-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.chapterProgress.appUser')}
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
                id="chapter-progress-chapter"
                name="chapter"
                data-cy="chapter"
                label={translate('langleagueApp.chapterProgress.chapter')}
                type="select"
              >
                <option value="" key="0" />
                {chapters
                  ? chapters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/chapter-progress" replace color="info">
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

export default ChapterProgressUpdate;
