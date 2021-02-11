import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ConfirmDialog from './ConfirmDialog';
import {
  setChannel, setModal, setModalData, removeChannel,
} from '../store';
import API from '../libs/api';

const selectChannels = (state) => state.channels;
const selectCurrentChannelId = (state) => state.currentChannelId;
const selectCurrentChannel = createSelector(
  [selectChannels, selectCurrentChannelId],
  (channels, currentChannelId) => channels
    .find(({ id }) => id === currentChannelId),
);
const mapStateToProps = (state) => ({
  currentChannel: selectCurrentChannel(state),
});

const mapDispatchToProps = {
  setChannel, setModal, setModalData, removeChannel,
};

function Channels({
  channels, setChannel, setModal, setModalData, currentChannel, removeChannel,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const rename = () => {
    setModal('manageChannel');
    setModalData({ channelId: currentChannel.id });
  };

  const remove = async () => {
    setShowConfirm(false);
    await API.request('removeChannel', {
      id: currentChannel.id,
    });
    removeChannel(currentChannel.id);
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
        title="Confirm channel remove"
        text={`Are you sure want to delete channel "${currentChannel.name}"`}
      />
      <Nav className="flex-column">
        {channels.map(({ id, name, removable }) => (
          <Nav.Item
            key={id}
            onClick={() => setChannel(id)}
          >
            <Dropdown as={ButtonGroup} className="d-flex mb-2">
              <Button
                variant={id === currentChannel.id ? 'primary' : 'light'}
                className="flex-grow-1 text-left"
                onClick={() => setChannel(id)}
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
                  <Dropdown.Item as="button" onClick={rename}>Rename</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={removeRequest}>Remove</Dropdown.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
