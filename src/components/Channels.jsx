import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import {
  setChannel, openModal,
} from '../store';

function Channels({ channels }) {
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const rename = () => {
    dispatch(openModal({
      name: 'addRenameChannel',
      data: { channelId: currentChannelId },
    }));
  };

  const remove = () => {
    dispatch(openModal({
      name: 'removeChannel',
      data: { channelId: currentChannelId },
    }));
  };

  return (
    <Nav className="overflow-auto">
      {channels.map(({ id, name, removable }) => (
        <Nav.Item
          className="w-100"
          key={id}
          onClick={() => dispatch(setChannel(id))}
        >
          <Dropdown as={ButtonGroup} className="d-flex mb-2">
            <Button
              variant={id === currentChannelId ? 'primary' : 'light'}
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
                variant={id === currentChannelId ? 'primary' : 'light'}
              />

              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={rename}>{t('rename')}</Dropdown.Item>
                <Dropdown.Item as="button" onClick={remove}>{t('remove')}</Dropdown.Item>
              </Dropdown.Menu>
            </>
            )}

          </Dropdown>

        </Nav.Item>
      ))}
    </Nav>
  );
}

export default Channels;
