import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../config/store';

import { getEntities as getListeningExercises } from '../../entities/listening-exercise/listening-exercise.reducer';
import { createEntity, getEntity, reset, updateEntity } from './listening-option.reducer';

export const ListeningOptionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const listeningExercises = useAppSelector(state => state.listeningExercise.entities);
  const listeningOptionEntity = useAppSelector(state => state.listeningOption.entity);
  const loading = useAppSelector(state => state.listeningOption.loading);
  const updating = useAppSelector(state => state.listeningOption.updating);
  const updateSuccess = useAppSelector(state => state.listeningOption.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/listening-option${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getListeningExercises({}));
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
      ...listeningOptionEntity,
      ...values,
      listeningExercise: listeningExercises.find(it => it.id.toString() === values.listeningExercise?.toString()),
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
          ...listeningOptionEntity,
          listeningExercise: listeningOptionEntity?.listeningExercise?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.listeningOption.home.createOrEditLabel" data-cy="ListeningOptionCreateUpdateHeading">
            <Translate contentKey="langleagueApp.listeningOption.home.createOrEditLabel">Create or edit a ListeningOption</Translate>
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
                  id="listening-option-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.listeningOption.label')}
                id="listening-option-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  maxLength: { value: 10, message: translate('entity.validation.maxlength', { max: 10 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.listeningOption.content')}
                id="listening-option-content"
                name="content"
                data-cy="content"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.listeningOption.isCorrect')}
                id="listening-option-isCorrect"
                name="isCorrect"
                data-cy="isCorrect"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.listeningOption.orderIndex')}
                id="listening-option-orderIndex"
                name="orderIndex"
                data-cy="orderIndex"
                type="text"
              />
              <ValidatedField
                id="listening-option-listeningExercise"
                name="listeningExercise"
                data-cy="listeningExercise"
                label={translate('langleagueApp.listeningOption.listeningExercise')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/listening-option" replace color="info">
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

export default ListeningOptionUpdate;
