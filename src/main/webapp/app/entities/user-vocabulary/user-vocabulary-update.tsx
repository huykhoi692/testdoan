import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getWords } from 'app/entities/word/word.reducer';
import { createEntity, getEntity, reset, updateEntity } from './user-vocabulary.reducer';

export const UserVocabularyUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const words = useAppSelector(state => state.word.entities);
  const userVocabularyEntity = useAppSelector(state => state.userVocabulary.entity);
  const loading = useAppSelector(state => state.userVocabulary.loading);
  const updating = useAppSelector(state => state.userVocabulary.updating);
  const updateSuccess = useAppSelector(state => state.userVocabulary.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/user-vocabulary${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getWords({}));
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
    values.lastReviewed = convertDateTimeToServer(values.lastReviewed);
    if (values.reviewCount !== undefined && typeof values.reviewCount !== 'number') {
      values.reviewCount = Number(values.reviewCount);
    }

    const entity = {
      ...userVocabularyEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      word: words.find(it => it.id.toString() === values.word?.toString()),
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
          lastReviewed: displayDefaultDateTime(),
        }
      : {
          ...userVocabularyEntity,
          lastReviewed: convertDateTimeFromServer(userVocabularyEntity.lastReviewed),
          appUser: userVocabularyEntity?.appUser?.id,
          word: userVocabularyEntity?.word?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.userVocabulary.home.createOrEditLabel" data-cy="UserVocabularyCreateUpdateHeading">
            <Translate contentKey="langleagueApp.userVocabulary.home.createOrEditLabel">Create or edit a UserVocabulary</Translate>
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
                  id="user-vocabulary-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.userVocabulary.remembered')}
                id="user-vocabulary-remembered"
                name="remembered"
                data-cy="remembered"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.userVocabulary.isMemorized')}
                id="user-vocabulary-isMemorized"
                name="isMemorized"
                data-cy="isMemorized"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.userVocabulary.lastReviewed')}
                id="user-vocabulary-lastReviewed"
                name="lastReviewed"
                data-cy="lastReviewed"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.userVocabulary.reviewCount')}
                id="user-vocabulary-reviewCount"
                name="reviewCount"
                data-cy="reviewCount"
                type="text"
              />
              <ValidatedField
                id="user-vocabulary-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.userVocabulary.appUser')}
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
                id="user-vocabulary-word"
                name="word"
                data-cy="word"
                label={translate('langleagueApp.userVocabulary.word')}
                type="select"
              >
                <option value="" key="0" />
                {words
                  ? words.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-vocabulary" replace color="info">
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

export default UserVocabularyUpdate;
