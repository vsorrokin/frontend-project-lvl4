import React, { useContext } from 'react';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { setChannel, setModal, setModalData } from '../store';
import AppContext from '../context';

const mapDispatchToProps = { setChannel, setModal, setModalData };

function Channels({
  channels, setChannel, setModal, setModalData,
}) {
  const { currentChannelId } = useContext(AppContext);

  const rename = (id) => {
    setModal('manageChannel');
    setModalData({ channelId: id });
  };

  return (
    <Nav className="flex-column">
      {channels.map(({ id, name, removable }) => (
        <Nav.Item
          key={id}
          onClick={() => setChannel(id)}
        >
          <Dropdown as={ButtonGroup} className="d-flex mb-2">
            <Button
              variant={id === currentChannelId ? 'primary' : 'light'}
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
                variant={id === currentChannelId ? 'primary' : 'light'}
              />

              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => rename(id)}>Rename</Dropdown.Item>
                <Dropdown.Item as="button">Remove</Dropdown.Item>
              </Dropdown.Menu>
            </>
            )}

          </Dropdown>

        </Nav.Item>
      ))}
    </Nav>
  );
}

export default connect(null, mapDispatchToProps)(Channels);
