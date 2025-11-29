import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity, getEntity } from './learning-streak.reducer';

export const LearningStreakDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  const learningStreakEntity = useAppSelector(state => state.learningStreak.entity);
  const updateSuccess = useAppSelector(state => state.learningStreak.updateSuccess);

  const handleClose = useCallback(() => {
    navigate(`/learning-streak${pageLocation.search}`);
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
    dispatch(deleteEntity(learningStreakEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="learningStreakDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="langleagueApp.learningStreak.delete.question">
        <Translate contentKey="langleagueApp.learningStreak.delete.question" interpolate={{ id: learningStreakEntity.id }}>
          Are you sure you want to delete this LearningStreak?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-learningStreak" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LearningStreakDeleteDialog;
