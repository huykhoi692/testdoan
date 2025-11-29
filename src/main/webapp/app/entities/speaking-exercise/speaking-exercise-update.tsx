import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../config/store';

import { getEntities as getChapters } from '../../entities/chapter/chapter.reducer';
import { createEntity, getEntity, reset, updateEntity } from './speaking-exercise.reducer';

export const SpeakingExerciseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const chapters = useAppSelector(state => state.chapter.entities);
  const speakingExerciseEntity = useAppSelector(state => state.speakingExercise.entity);
  const loading = useAppSelector(state => state.speakingExercise.loading);
  const updating = useAppSelector(state => state.speakingExercise.updating);
  const updateSuccess = useAppSelector(state => state.speakingExercise.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/speaking-exercise${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

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
    if (values.maxScore !== undefined && typeof values.maxScore !== 'number') {
      values.maxScore = Number(values.maxScore);
    }

    const entity = {
      ...speakingExerciseEntity,
      ...values,
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
      ? {}
      : {
          ...speakingExerciseEntity,
          chapter: speakingExerciseEntity?.chapter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.speakingExercise.home.createOrEditLabel" data-cy="SpeakingExerciseCreateUpdateHeading">
            <Translate contentKey="langleagueApp.speakingExercise.home.createOrEditLabel">Create or edit a SpeakingExercise</Translate>
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
                  id="speaking-exercise-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.speakingExercise.prompt')}
                id="speaking-exercise-prompt"
                name="prompt"
                data-cy="prompt"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.speakingExercise.sampleAudio')}
                id="speaking-exercise-sampleAudio"
                name="sampleAudio"
                data-cy="sampleAudio"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.speakingExercise.maxScore')}
                id="speaking-exercise-maxScore"
                name="maxScore"
                data-cy="maxScore"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="speaking-exercise-chapter"
                name="chapter"
                data-cy="chapter"
                label={translate('langleagueApp.speakingExercise.chapter')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/speaking-exercise" replace color="info">
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

export default SpeakingExerciseUpdate;
