import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';
import Chat from './Chat';
import NewMessageForm from './NewMessageForm';

function App({ data: { channels } }) {
  return (
    <Row className="h-100 border rounded">
      <Col lg="4" className="border-right pt-3">
        <h4 className="mb-3">Channels</h4>
        <Channels data={channels} />
      </Col>
      <Col className="pt-3 d-flex flex-column h-100">
        <h4 className="mb-3 pb-1 border-bottom">Chat</h4>
        <Chat className="border-bottom mb-3" />
        <NewMessageForm className="mt-auto" />
      </Col>
    </Row>
  );
}

export default App;
