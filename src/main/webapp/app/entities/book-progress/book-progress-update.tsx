import React, { useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/utils/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAppUsers } from 'app/entities/app-user/app-user.reducer';
import { getEntities as getBooks } from 'app/entities/book/book.reducer';
import { createEntity, getEntity, reset, updateEntity } from './book-progress.reducer';

export const BookProgressUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const appUsers = useAppSelector(state => state.appUser.entities);
  const books = useAppSelector(state => state.book.entities);
  const bookProgressEntity = useAppSelector(state => state.bookProgress.entity);
  const loading = useAppSelector(state => state.bookProgress.loading);
  const updating = useAppSelector(state => state.bookProgress.updating);
  const updateSuccess = useAppSelector(state => state.bookProgress.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/book-progress${location.search}`);
  }, [navigate]);

  useEffect(() => {
    if (isNew) {
      dispatch(reset() as any);
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAppUsers({}));
    dispatch(getBooks({}));
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
    if (values.percent !== undefined && typeof values.percent !== 'number') {
      values.percent = Number(values.percent);
    }
    values.lastAccessed = convertDateTimeToServer(values.lastAccessed);

    const entity = {
      ...bookProgressEntity,
      ...values,
      appUser: appUsers.find(it => it.id.toString() === values.appUser?.toString()),
      book: books.find(it => it.id.toString() === values.book?.toString()),
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
          lastAccessed: displayDefaultDateTime(),
        }
      : {
          ...bookProgressEntity,
          lastAccessed: convertDateTimeFromServer(bookProgressEntity.lastAccessed),
          appUser: bookProgressEntity?.appUser?.id,
          book: bookProgressEntity?.book?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="langleagueApp.bookProgress.home.createOrEditLabel" data-cy="BookProgressCreateUpdateHeading">
            <Translate contentKey="langleagueApp.bookProgress.home.createOrEditLabel">Create or edit a BookProgress</Translate>
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
                  id="book-progress-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('langleagueApp.bookProgress.percent')}
                id="book-progress-percent"
                name="percent"
                data-cy="percent"
                type="text"
              />
              <ValidatedField
                label={translate('langleagueApp.bookProgress.lastAccessed')}
                id="book-progress-lastAccessed"
                name="lastAccessed"
                data-cy="lastAccessed"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('langleagueApp.bookProgress.completed')}
                id="book-progress-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField
                id="book-progress-appUser"
                name="appUser"
                data-cy="appUser"
                label={translate('langleagueApp.bookProgress.appUser')}
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
                id="book-progress-book"
                name="book"
                data-cy="book"
                label={translate('langleagueApp.bookProgress.book')}
                type="select"
              >
                <option value="" key="0" />
                {books
                  ? books.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book-progress" replace color="info">
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

export default BookProgressUpdate;
