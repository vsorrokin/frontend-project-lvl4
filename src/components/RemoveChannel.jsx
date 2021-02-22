import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { closeModal } from '../store';
import API from '../libs/api';

const selectChannels = (state) => state.chat.channels;
const selectModalData = (state) => state.modal.modalData;
const selectCurrentChannel = createSelector(
  [selectChannels, selectModalData],
  (channels, modalData) => channels
    .find(({ id }) => id === modalData?.channelId) || {},
);

function RemoveChannel() {
  const dispatch = useDispatch();
  const currentChannel = useSelector(selectCurrentChannel);
  const visibleModalName = useSelector((state) => state.modal.visibleModalName);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onConfirm = async () => {
    await API.request('removeChannel', {
      id: currentChannel.id,
    });
    handleClose();
  };

  return (
    <Modal show={visibleModalName === 'removeChannel'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('confirmChannelRemove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`${t('sureWantToDeleteChannel')} "${currentChannel.name}"`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveChannel;
