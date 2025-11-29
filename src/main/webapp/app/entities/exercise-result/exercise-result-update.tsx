import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getListeningExercises } from 'app/entities/listening-exercise/listening-exercise.reducer';
import { getEntities as getSpeakingExercises } from 'app/entities/speaking-exercise/speaking-exercise.reducer';
import { getEntities as getReadingExercises } from 'app/entities/reading-exercise/reading-exercise.reducer';
import { getEntities as getWritingExercises } from 'app/entities/writing-exercise/writing-exercise.reducer';
import { ExerciseType } from 'app/shared/model/enumerations/exercise-type.model';
import { createEntity, getEntity, reset, updateEntity } from './exercise-result.reducer';

export const ExerciseResultUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const listeningExercises = useAppSelector(state => state.listeningExercise.entities);
  const speakingExercises = useAppSelector(state => state.speakingExercise.entities);
  const readingExercises = useAppSelector(state => state.readingExercise.entities);
  const writingExercises = useAppSelector(state => state.writingExercise.entities);
  const exerciseResultEntity = useAppSelector(state => state.exerciseResult.entity);
  const loading = useAppSelector(state => state.exerciseResult.loading);
  const updating = useAppSelector(state => state.exerciseResult.updating);
  const updateSuccess = useAppSelector(state => state.exerciseResult.updateSuccess);
  const exerciseTypeValues = Object.keys(ExerciseType);

  const handleClose = useCallback(() => {
    navigate(`/exercise-result${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getListeningExercises({}));
    dispatch(getSpeakingExercises({}));
    dispatch(getReadingExercises({}));
    dispatch(getWritingExercises({}));
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
    if (values.score !== undefined && typeof values.score !== 'number') {
      values.score = Number(values.score);
    }
    values.submittedAt = convertDateTimeToServer(values.submittedAt);

    const entity = {
      ...exerciseResultEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      listeningExercise: listeningExercises.find(it => it.id.toString() === values.listeningExercise?.toString()),
      speakingExercise: speakingExercises.find(it => it.id.toString() === values.speakingExercise?.toString()),
      readingExercise: readingExercises.find(it => it.id.toString() === values.readingExercise?.toString()),
      writingExercise: writingExercises.find(it => it.id.toString() === values.writingExercise?.toString()),
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
          submittedAt: displayDefaultDateTime(),
        }
      : {
          exerciseType: 'LISTENING',
          ...exerciseResultEntity,
          submittedAt: convertDateTimeFromServer(exerciseResultEntity.submittedAt),
          appUser: exerciseResultEntity?.appUser?.id,
          listeningExercise: exerciseResultEntity?.listeningExercise?.id,
          speakingExercise: exerciseResultEntity?.speakingExercise?.id,
          readingExercise: exerciseResultEntity?.readingExercise?.id,
          writingExercise: exerciseResultEntity?.writingExercise?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.exerciseResult.home.createOrEditLabel" data-cy="ExerciseResultCreateUpdateHeading">
            <Translate contentKey="langleagueApp.exerciseResult.home.createOrEditLabel">Create or edit a ExerciseResult</Translate>
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
                  id="exercise-result-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.exerciseResult.exerciseType')}
                id="exercise-result-exerciseType"
                name="exerciseType"
                data-cy="exerciseType"
                type="select"
              >
                {exerciseTypeValues.map(exerciseType => (
                  <option value={exerciseType} key={exerciseType}>
                    {translate(`langleagueApp.ExerciseType.${exerciseType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('langleagueApp.exerciseResult.score')}
                id="exercise-result-score"
                name="score"
                data-cy="score"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.exerciseResult.userAnswer')}
                id="exercise-result-userAnswer"
                name="userAnswer"
                data-cy="userAnswer"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.exerciseResult.submittedAt')}
                id="exercise-result-submittedAt"
                name="submittedAt"
                data-cy="submittedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="exercise-result-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.exerciseResult.appUser')}
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
                id="exercise-result-listeningExercise"
                name="listeningExercise"
                data-cy="listeningExercise"
                label={translate('langleagueApp.exerciseResult.listeningExercise')}
                type="select"
              >
                <option value="" key="0" />
                {listeningExercises
                  ? listeningExercises.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="exercise-result-speakingExercise"
                name="speakingExercise"
                data-cy="speakingExercise"
                label={translate('langleagueApp.exerciseResult.speakingExercise')}
                type="select"
              >
                <option value="" key="0" />
                {speakingExercises
                  ? speakingExercises.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="exercise-result-readingExercise"
                name="readingExercise"
                data-cy="readingExercise"
                label={translate('langleagueApp.exerciseResult.readingExercise')}
                type="select"
              >
                <option value="" key="0" />
                {readingExercises
                  ? readingExercises.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="exercise-result-writingExercise"
                name="writingExercise"
                data-cy="writingExercise"
                label={translate('langleagueApp.exerciseResult.writingExercise')}
                type="select"
              >
                <option value="" key="0" />
                {writingExercises
                  ? writingExercises.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/exercise-result" replace color="info">
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

export default ExerciseResultUpdate;
