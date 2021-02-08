import React, { useContext } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { setChannel } from '../store';
import AppContext from '../context';

const mapDispatchToProps = { setChannel };

function Channels({ channels, setChannel }) {
  const { currentChannelId } = useContext(AppContext);

  return (
    <ListGroup>
      {channels.map(({ id, name }) => (
        <ListGroup.Item
          active={id === currentChannelId}
          key={id}
          action
          onClick={() => setChannel(id)}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default connect(null, mapDispatchToProps)(Channels);
