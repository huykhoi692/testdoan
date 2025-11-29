import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getChapters } from 'app/entities/chapter/chapter.reducer';
import { createEntity, getEntity, reset, updateEntity } from './listening-exercise.reducer';

export const ListeningExerciseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const chapters = useAppSelector(state => state.chapter.entities);
  const listeningExerciseEntity = useAppSelector(state => state.listeningExercise.entity);
  const loading = useAppSelector(state => state.listeningExercise.loading);
  const updating = useAppSelector(state => state.listeningExercise.updating);
  const updateSuccess = useAppSelector(state => state.listeningExercise.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/listening-exercise${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
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
      ...listeningExerciseEntity,
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
          ...listeningExerciseEntity,
          chapter: listeningExerciseEntity?.chapter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.listeningExercise.home.createOrEditLabel" data-cy="ListeningExerciseCreateUpdateHeading">
            <Translate contentKey="langleagueApp.listeningExercise.home.createOrEditLabel">Create or edit a ListeningExercise</Translate>
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
                  id="listening-exercise-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.audioPath')}
                id="listening-exercise-audioPath"
                name="audioPath"
                data-cy="audioPath"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.imageUrl')}
                id="listening-exercise-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
                validate={{
                  maxLength: { value: 512, message: translate('entity.validation.maxlength', { max: 512 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.transcript')}
                id="listening-exercise-transcript"
                name="transcript"
                data-cy="transcript"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.question')}
                id="listening-exercise-question"
                name="question"
                data-cy="question"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.correctAnswer')}
                id="listening-exercise-correctAnswer"
                name="correctAnswer"
                data-cy="correctAnswer"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.listeningExercise.maxScore')}
                id="listening-exercise-maxScore"
                name="maxScore"
                data-cy="maxScore"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="listening-exercise-chapter"
                name="chapter"
                data-cy="chapter"
                label={translate('langleagueApp.listeningExercise.chapter')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/listening-exercise" replace color="info">
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

export default ListeningExerciseUpdate;
