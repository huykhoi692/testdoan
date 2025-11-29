import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './streak-icon.reducer';

export const StreakIconDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  const streakIconEntity = useAppSelector(state => state.streakIcon.entity);
  const updateSuccess = useAppSelector(state => state.streakIcon.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/streak-icon${pageLocation.search}`);
  }, [navigate, pageLocation.search]);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, [dispatch, id]);

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess, handleClose, loadModal]);

  const confirmDelete = () => {
    dispatch(deleteEntity(streakIconEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="streakIconDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="langleagueApp.streakIcon.delete.question">
        <Translate contentKey="langleagueApp.streakIcon.delete.question" interpolate={{ id: streakIconEntity.id }}>
          Are you sure you want to delete this StreakIcon?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-streakIcon" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StreakIconDeleteDialog;
