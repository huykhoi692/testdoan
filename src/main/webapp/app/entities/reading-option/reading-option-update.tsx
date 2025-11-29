import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeft, Save, BookOpen, CheckCircle, XCircle } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../config/store';

import { getEntities as getReadingExercises } from '../../entities/reading-exercise/reading-exercise.reducer';
import { createEntity, getEntity, reset, updateEntity } from './reading-option.reducer';

import './reading-option-update.scss';

export const ReadingOptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const readingExercises = useAppSelector(state => state.readingExercise.entities);
  const readingOptionEntity = useAppSelector(state => state.readingOption.entity);
  const loading = useAppSelector(state => state.readingOption.loading);
  const updating = useAppSelector(state => state.readingOption.updating);
  const updateSuccess = useAppSelector(state => state.readingOption.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/reading-option${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getReadingExercises({}));
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
    if (values.orderIndex !== undefined && typeof values.orderIndex !== 'number') {
      values.orderIndex = Number(values.orderIndex);
    }

    const entity = {
      ...readingOptionEntity,
      ...values,
      readingExercise: readingExercises.find(it => it.id.toString() === values.readingExercise?.toString()),
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
          ...readingOptionEntity,
          readingExercise: readingOptionEntity?.readingExercise,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.readingOption.home.createOrEditLabel" data-cy="ReadingOptionCreateUpdateHeading">
            <Translate contentKey="langleagueApp.readingOption.home.createOrEditLabel">Create or edit a ReadingOption</Translate>
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
                  id="reading-option-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.readingOption.label')}
                id="reading-option-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  maxLength: { value: 10, message: translate('entity.validation.maxlength', { max: 10 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.readingOption.content')}
                id="reading-option-content"
                name="content"
                data-cy="content"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.readingOption.isCorrect')}
                id="reading-option-isCorrect"
                name="isCorrect"
                data-cy="isCorrect"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.readingOption.orderIndex')}
                id="reading-option-orderIndex"
                name="orderIndex"
                data-cy="orderIndex"
                type="text"
              />
              <ValidatedField
                id="reading-option-readingExercise"
                name="readingExercise"
                data-cy="readingExercise"
                label={translate('langleagueApp.readingOption.readingExercise')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/reading-option" replace color="info">
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

export default ReadingOptionUpdate;
