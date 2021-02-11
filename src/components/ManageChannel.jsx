import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import API from '../libs/api';
import {
  addChannel, setChannel, setModal, setModalData, updateChannel,
} from '../store';

const mapDispatchToProps = {
  addChannel, setChannel, setModal, setModalData, updateChannel,
};

const selectChannels = (state) => state.channels;
const selectModalData = (state) => state.modalData;

const selectCurrentChannel = createSelector(
  [selectChannels, selectModalData],
  (channels, modalData) => channels
    .find(({ id }) => id === modalData?.channelId),
);

const mapStateToProps = (state) => ({
  visibleModalName: state.visibleModalName,
  currentChannel: selectCurrentChannel(state),
});

function ManageChannel({
  addChannel, setChannel, setModal, setModalData,
  visibleModalName, currentChannel = {}, updateChannel,
}) {
  const isEditMode = !!currentChannel?.id;

  const { t } = useTranslation();

  const input = useRef(null);

  useEffect(() => {
    if (visibleModalName) {
      input.current.focus();
    }
  }, [visibleModalName]);

  const handleClose = () => {
    setModal(null);
    setModalData(null);
  };

  const validate = ({ name }) => {
    const errors = {};
    if (!name) {
      errors.name = t('channelNameRequired');
    }
    if (name.length < 3) {
      errors.name = t('channelNameLess', { count: 3 });
    }
    return errors;
  };

  const onSubmit = async ({ name }, { setSubmitting, resetForm }) => {
    try {
      const requestName = isEditMode ? 'patchChannel' : 'createChannel';
      const { data: { data: { attributes: createdChannel } } } = await API.request(requestName, {
        name,
        id: currentChannel?.id,
      });
      if (!isEditMode) {
        addChannel(createdChannel);
        setChannel(createdChannel.id);
      } else {
        updateChannel({
          id: currentChannel.id,
          name,
        });
      }
      handleClose();
    } catch (e) {
      console.error(e);
    }

    resetForm();
    setSubmitting(false);
  };

  return (
    <Modal show={visibleModalName === 'manageChannel'} onHide={handleClose}>
      <Formik
        initialValues={{ name: currentChannel.name || '' }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {isEditMode ? t('renameChannel') : t('newChannel')}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                ref={input}
                type="text"
                name="name"
                placeholder={t('enterChannelName')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('cancel')}
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {t('save')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageChannel);
