import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getGrammars } from 'app/entities/grammar/grammar.reducer';
import { createEntity, getEntity, reset, updateEntity } from './grammar-example.reducer';

export const GrammarExampleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const grammars = useAppSelector(state => state.grammar.entities);
  const grammarExampleEntity = useAppSelector(state => state.grammarExample.entity);
  const loading = useAppSelector(state => state.grammarExample.loading);
  const updating = useAppSelector(state => state.grammarExample.updating);
  const updateSuccess = useAppSelector(state => state.grammarExample.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/grammar-example${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

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

    const entity = {
      ...grammarExampleEntity,
      ...values,
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
      ? {}
      : {
          ...grammarExampleEntity,
          grammar: grammarExampleEntity?.grammar?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.grammarExample.home.createOrEditLabel" data-cy="GrammarExampleCreateUpdateHeading">
            <Translate contentKey="langleagueApp.grammarExample.home.createOrEditLabel">Create or edit a GrammarExample</Translate>
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
                  id="grammar-example-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.grammarExample.exampleText')}
                id="grammar-example-exampleText"
                name="exampleText"
                data-cy="exampleText"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.grammarExample.translation')}
                id="grammar-example-translation"
                name="translation"
                data-cy="translation"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.grammarExample.explanation')}
                id="grammar-example-explanation"
                name="explanation"
                data-cy="explanation"
                type="textarea"
              />
              <ValidatedField
                id="grammar-example-grammar"
                name="grammar"
                data-cy="grammar"
                label={translate('langleagueApp.grammarExample.grammar')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/grammar-example" replace color="info">
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

export default GrammarExampleUpdate;
