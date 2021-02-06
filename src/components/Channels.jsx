import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function Channels({ channels, currentChannelId }) {
  return (
    <ListGroup>
      {channels.map(({ id, name }) => (
        <ListGroup.Item active={id === currentChannelId} key={id} action>{name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Channels;
