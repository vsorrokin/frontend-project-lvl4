import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function Channels({ data: list }) {
  return (
    <ListGroup>
      {list.map(({ id, name }) => (
        <ListGroup.Item key={id} action>{name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Channels;
