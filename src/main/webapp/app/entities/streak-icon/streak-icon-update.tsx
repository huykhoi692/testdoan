import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { createEntity, getEntity, reset, updateEntity } from './streak-icon.reducer';

export const StreakIconUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const streakIconEntity = useAppSelector(state => state.streakIcon.entity);
  const loading = useAppSelector(state => state.streakIcon.loading);
  const updating = useAppSelector(state => state.streakIcon.updating);
  const updateSuccess = useAppSelector(state => state.streakIcon.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/streak-icon${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }
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
    if (values.minDays !== undefined && typeof values.minDays !== 'number') {
      values.minDays = Number(values.minDays);
    }

    const entity = {
      ...streakIconEntity,
      ...values,
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
          ...streakIconEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.streakIcon.home.createOrEditLabel" data-cy="StreakIconCreateUpdateHeading">
            <Translate contentKey="langleagueApp.streakIcon.home.createOrEditLabel">Create or edit a StreakIcon</Translate>
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
                  id="streak-icon-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.streakIcon.level')}
                id="streak-icon-level"
                name="level"
                data-cy="level"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.streakIcon.minDays')}
                id="streak-icon-minDays"
                name="minDays"
                data-cy="minDays"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.streakIcon.iconPath')}
                id="streak-icon-iconPath"
                name="iconPath"
                data-cy="iconPath"
                type="text"
                validate={{
                  maxLength: { value: 256, message: translate('entity.validation.maxlength', { max: 256 }) },
                }}
              />
              <ValidatedField
                label={translate('langleagueApp.streakIcon.description')}
                id="streak-icon-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/streak-icon" replace color="info">
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

export default StreakIconUpdate;
