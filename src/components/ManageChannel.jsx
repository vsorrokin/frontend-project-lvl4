import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import API from '../libs/api';
import {
  setChannel, closeModal,
} from '../store';

const selectChannels = (state) => state.chat.channels;
const selectModalData = (state) => state.modal.modalData;
const selectCurrentChannel = createSelector(
  [selectChannels, selectModalData],
  (channels, modalData) => channels
    .find(({ id }) => id === modalData?.channelId) || {},
);

function ManageChannel() {
  const currentChannel = useSelector(selectCurrentChannel);
  const visibleModalName = useSelector((state) => state.modal.visibleModalName);
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const input = useRef(null);
  const isEditMode = !!currentChannel?.id;

  useEffect(() => {
    if (visibleModalName) {
      input.current.focus();
    }
  }, [visibleModalName]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async ({ name }, { setSubmitting, resetForm }) => {
    try {
      const requestName = isEditMode ? 'patchChannel' : 'createChannel';
      const { data: { data: { attributes: createdChannel } } } = await API.request(requestName, {
        name: name.trim(),
        id: currentChannel?.id,
      });
      if (!isEditMode) {
        dispatch(setChannel(createdChannel.id));
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
        validationSchema={Yup.object({
          name: Yup.string()
            .required(t('channelNameRequired'))
            .min(3, t('channelNameLess', { count: 3 }))
            .max(20, t('channelNameMax', { count: 20 }))
            .test('unique', t('channelNameUnique'), (name = '') => {
              const processedName = name.trim();
              if (isEditMode && processedName === currentChannel.name) {
                return true;
              }
              if (channels.find(({ name: channelName }) => channelName === processedName)) {
                return false;
              }
              return true;
            }),
        })}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          // handleBlur,
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
                // onBlur={handleBlur}
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

export default ManageChannel;
