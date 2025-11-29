import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getChapters } from 'app/entities/chapter/chapter.reducer';
import { createEntity, getEntity, reset, updateEntity } from './writing-exercise.reducer';

export const WritingExerciseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const chapters = useAppSelector(state => state.chapter.entities);
  const writingExerciseEntity = useAppSelector(state => state.writingExercise.entity);
  const loading = useAppSelector(state => state.writingExercise.loading);
  const updating = useAppSelector(state => state.writingExercise.updating);
  const updateSuccess = useAppSelector(state => state.writingExercise.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/writing-exercise${location.search}`);
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
      ...writingExerciseEntity,
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
          ...writingExerciseEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.writingExercise.home.createOrEditLabel" data-cy="WritingExerciseCreateUpdateHeading">
            <Translate contentKey="langleagueApp.writingExercise.home.createOrEditLabel">Create or edit a WritingExercise</Translate>
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
                  id="writing-exercise-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.writingExercise.prompt')}
                id="writing-exercise-prompt"
                name="prompt"
                data-cy="prompt"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.writingExercise.sampleAnswer')}
                id="writing-exercise-sampleAnswer"
                name="sampleAnswer"
                data-cy="sampleAnswer"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.writingExercise.maxScore')}
                id="writing-exercise-maxScore"
                name="maxScore"
                data-cy="maxScore"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="writing-exercise-chapter"
                name="chapter"
                data-cy="chapter"
                label={translate('langleagueApp.writingExercise.chapter')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/writing-exercise" replace color="info">
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

export default WritingExerciseUpdate;
