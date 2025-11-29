import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getStudySessions } from 'app/entities/study-session/study-session.reducer';
import { createEntity, getEntity, reset, updateEntity } from './streak-milestone.reducer';

export const StreakMilestoneUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const studySessions = useAppSelector(state => state.studySession.entities);
  const streakMilestoneEntity = useAppSelector(state => state.streakMilestone.entity);
  const loading = useAppSelector(state => state.streakMilestone.loading);
  const updating = useAppSelector(state => state.streakMilestone.updating);
  const updateSuccess = useAppSelector(state => state.streakMilestone.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/streak-milestone${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getStudySessions({}));
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
    if (values.milestoneDays !== undefined && typeof values.milestoneDays !== 'number') {
      values.milestoneDays = Number(values.milestoneDays);
    }

    const entity = {
      ...streakMilestoneEntity,
      ...values,
      studySession: studySessions.find(it => it.id.toString() === values.studySession?.toString()),
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
          ...streakMilestoneEntity,
          studySession: streakMilestoneEntity?.studySession?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.streakMilestone.home.createOrEditLabel" data-cy="StreakMilestoneCreateUpdateHeading">
            <Translate contentKey="langleagueApp.streakMilestone.home.createOrEditLabel">Create or edit a StreakMilestone</Translate>
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
                  id="streak-milestone-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.streakMilestone.milestoneDays')}
                id="streak-milestone-milestoneDays"
                name="milestoneDays"
                data-cy="milestoneDays"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.streakMilestone.rewardName')}
                id="streak-milestone-rewardName"
                name="rewardName"
                data-cy="rewardName"
                type="text"
                validate={{
                  maxLength: { value: 255, message: translate('entity.validation.maxlength', { max: 255 }) },
                }}
              />
              <ValidatedField
                id="streak-milestone-studySession"
                name="studySession"
                data-cy="studySession"
                label={translate('langleagueApp.streakMilestone.studySession')}
                type="select"
              >
                <option value="" key="0" />
                {studySessions
                  ? studySessions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/streak-milestone" replace color="info">
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

export default StreakMilestoneUpdate;
