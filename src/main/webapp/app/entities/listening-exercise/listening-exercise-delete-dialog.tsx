import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './listening-exercise.reducer';

export const ListeningExerciseDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  const listeningExerciseEntity = useAppSelector(state => state.listeningExercise.entity);
  const updateSuccess = useAppSelector(state => state.listeningExercise.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/listening-exercise${pageLocation.search}`);
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
    dispatch(deleteEntity(listeningExerciseEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="listeningExerciseDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="langleagueApp.listeningExercise.delete.question">
        <Translate contentKey="langleagueApp.listeningExercise.delete.question" interpolate={{ id: listeningExerciseEntity.id }}>
          Are you sure you want to delete this ListeningExercise?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-listeningExercise" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ListeningExerciseDeleteDialog;
