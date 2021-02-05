import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './components/Channels';
import Chat from './components/Chat';
import NewMessageForm from './components/NewMessageForm';

function App({ data: { channels, currentChannelId, messages } }) {
  const [channelMessages] = useState(
    messages.filter(({ channelId }) => channelId === currentChannelId),
  );

  return (
    <Row className="h-100 border rounded">
      <Col lg="4" className="border-right pt-3">
        <h4 className="mb-3">Channels</h4>
        <Channels data={channels} />
      </Col>
      <Col className="pt-3 d-flex flex-column h-100">
        <h4 className="mb-3 pb-1 border-bottom">Chat</h4>
        <Chat messages={channelMessages} className="border-bottom mb-3 flex-grow-1" />
        <NewMessageForm className="mt-auto" />
      </Col>
    </Row>
  );
}

export default App;
