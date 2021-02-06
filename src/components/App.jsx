import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from './Channels';
import Chat from './Chat';
import NewMessageForm from './NewMessageForm';
import AppContext from '../context';

const selectMessages = (state) => state.messages;
const selectCurrentChannelId = (state) => state.currentChannelId;

const selectChannelMessages = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

const mapStateToProps = (state) => ({
  nickname: state.nickname,
  channels: state.channels,
  messages: selectChannelMessages(state),
  currentChannelId: selectCurrentChannelId(state),
});

function App({
  channels, messages, nickname, currentChannelId,
}) {
  return (
    <Row className="h-100 border rounded">
      <Col lg="4" className="border-right pt-3">
        <h4 className="mb-3">Channels</h4>
        <Channels currentChannelId={currentChannelId} channels={channels} />
      </Col>
      <Col className="pt-3 d-flex flex-column h-100">
        <h4 className="mb-3 pb-1 border-bottom">Chat</h4>
        <AppContext.Provider value={nickname}>
          <Chat messages={messages} className="border-bottom mb-3 flex-grow-1" />
          <NewMessageForm className="mt-auto" />
        </AppContext.Provider>
      </Col>
    </Row>
  );
}

export default connect(mapStateToProps)(App);
