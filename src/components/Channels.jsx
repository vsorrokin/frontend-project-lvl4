import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import ConfirmDialog from './ConfirmDialog';
import {
  setChannel, openModal,
} from '../store';
import API from '../libs/api';

const selectChannels = (state) => state.channels;
const selectCurrentChannelId = (state) => state.currentChannelId;
const selectCurrentChannel = createSelector(
  [selectChannels, selectCurrentChannelId],
  (channels, currentChannelId) => channels
    .find(({ id }) => id === currentChannelId),
);

function Channels({ channels }) {
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  const rename = () => {
    dispatch(openModal({
      name: 'manageChannel',
      data: { channelId: currentChannel.id },
    }));
  };

  const remove = async () => {
    setShowConfirm(false);
    await API.request('removeChannel', {
      id: currentChannel.id,
    });
  };

  const removeRequest = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <ConfirmDialog
        onConfirm={remove}
        onCancel={() => setShowConfirm(false)}
        show={showConfirm}
        title={t('confirmChannelRemove')}
        text={`${t('sureWantToDeleteChannel')} "${currentChannel.name}"`}
      />
      <Nav className="overflow-auto">
        {channels.map(({ id, name, removable }) => (
          <Nav.Item
            className="w-100"
            key={id}
            onClick={() => dispatch(setChannel(id))}
          >
            <Dropdown as={ButtonGroup} className="d-flex mb-2">
              <Button
                variant={id === currentChannel.id ? 'primary' : 'light'}
                className="flex-grow-1 text-left"
                onClick={() => dispatch(setChannel(id))}
              >
                {name}
              </Button>

              {removable && (
              <>
                <Dropdown.Toggle
                  className="flex-grow-0"
                  split
                  variant={id === currentChannel.id ? 'primary' : 'light'}
                />

                <Dropdown.Menu>
                  <Dropdown.Item as="button" onClick={rename}>{t('rename')}</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={removeRequest}>{t('remove')}</Dropdown.Item>
                </Dropdown.Menu>
              </>
              )}

            </Dropdown>

          </Nav.Item>
        ))}
      </Nav>
    </>
  );
}

export default Channels;
