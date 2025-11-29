import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getGrammars } from 'app/entities/grammar/grammar.reducer';
import { createEntity, getEntity, reset, updateEntity } from './user-grammar.reducer';

export const UserGrammarUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const grammars = useAppSelector(state => state.grammar.entities);
  const userGrammarEntity = useAppSelector(state => state.userGrammar.entity);
  const loading = useAppSelector(state => state.userGrammar.loading);
  const updating = useAppSelector(state => state.userGrammar.updating);
  const updateSuccess = useAppSelector(state => state.userGrammar.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/user-grammar${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getGrammars({}));
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
      ...userGrammarEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      grammar: grammars.find(it => it.id.toString() === values.grammar?.toString()),
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
          ...userGrammarEntity,
          lastReviewed: convertDateTimeFromServer(userGrammarEntity.lastReviewed),
          appUser: userGrammarEntity?.appUser?.id,
          grammar: userGrammarEntity?.grammar?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.userGrammar.home.createOrEditLabel" data-cy="UserGrammarCreateUpdateHeading">
            <Translate contentKey="langleagueApp.userGrammar.home.createOrEditLabel">Create or edit a UserGrammar</Translate>
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
                  id="user-grammar-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.userGrammar.remembered')}
                id="user-grammar-remembered"
                name="remembered"
                data-cy="remembered"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.userGrammar.isMemorized')}
                id="user-grammar-isMemorized"
                name="isMemorized"
                data-cy="isMemorized"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('langleagueApp.userGrammar.lastReviewed')}
                id="user-grammar-lastReviewed"
                name="lastReviewed"
                data-cy="lastReviewed"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.userGrammar.reviewCount')}
                id="user-grammar-reviewCount"
                name="reviewCount"
                data-cy="reviewCount"
                type="text"
              />
              <ValidatedField
                id="user-grammar-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.userGrammar.appUser')}
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
                id="user-grammar-grammar"
                name="grammar"
                data-cy="grammar"
                label={translate('langleagueApp.userGrammar.grammar')}
                type="select"
              >
                <option value="" key="0" />
                {grammars
                  ? grammars.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-grammar" replace color="info">
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

export default UserGrammarUpdate;
