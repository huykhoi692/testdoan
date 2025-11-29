import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getWords } from 'app/entities/word/word.reducer';
import { createEntity, getEntity, reset, updateEntity } from './word-example.reducer';

export const WordExampleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const words = useAppSelector(state => state.word.entities);
  const wordExampleEntity = useAppSelector(state => state.wordExample.entity);
  const loading = useAppSelector(state => state.wordExample.loading);
  const updating = useAppSelector(state => state.wordExample.updating);
  const updateSuccess = useAppSelector(state => state.wordExample.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/word-example${location.search}`);
  }, [navigate, location.search]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getWords({}));
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
      ...wordExampleEntity,
      ...values,
      word: words.find(it => it.id.toString() === values.word?.toString()),
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
          ...wordExampleEntity,
          word: wordExampleEntity?.word?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.wordExample.home.createOrEditLabel" data-cy="WordExampleCreateUpdateHeading">
            <Translate contentKey="langleagueApp.wordExample.home.createOrEditLabel">Create or edit a WordExample</Translate>
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
                  id="word-example-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.wordExample.exampleText')}
                id="word-example-exampleText"
                name="exampleText"
                data-cy="exampleText"
                type="textarea"
              />
              <ValidatedField
                label={translate('langleagueApp.wordExample.translation')}
                id="word-example-translation"
                name="translation"
                data-cy="translation"
                type="textarea"
              />
              <ValidatedField
                id="word-example-word"
                name="word"
                data-cy="word"
                label={translate('langleagueApp.wordExample.word')}
                type="select"
              >
                <option value="" key="0" />
                {words
                  ? words.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/word-example" replace color="info">
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

export default WordExampleUpdate;
