import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Channels from './Channels';
import ManageChannel from './ManageChannel';
import Chat from './Chat';
import NewMessageForm from './NewMessageForm';
import AppContext from '../context';
import { setModal as setModalOrigin } from '../store';

const selectMessages = (state) => state.messages;
const selectCurrentChannelId = (state) => state.currentChannelId;

const selectChannelMessages = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);

const mapStateToProps = (state) => ({
  channels: state.channels,
  messages: selectChannelMessages(state),
  currentChannelId: selectCurrentChannelId(state),
});

const mapDispatchToProps = { setModal: setModalOrigin };

function App({
  channels, messages, nickname, currentChannelId, setModal,
}) {
  const { t } = useTranslation();
  const showNewChannelForm = () => {
    setModal('manageChannel');
  };

  return (
    <AppContext.Provider value={{ nickname, currentChannelId }}>
      <ManageChannel />
      <Row className="h-100 border rounded">
        <Col lg="4" className="border-right pt-3 pb-3 d-flex flex-column h-100">
          <div className="d-flex mb-3">
            <h4 className="mb-0">{t('channels')}</h4>
            <Button variant="link" className="ml-auto p-0" size="sm" onClick={showNewChannelForm}>
              {t('newChannel')}
            </Button>
          </div>
          <Channels channels={channels} />
        </Col>
        <Col className="pt-3 d-flex flex-column h-100">
          <h4 className="mb-3 pb-1 border-bottom">{t('chat')}</h4>
          <Chat messages={messages} className="border-bottom mb-3 flex-grow-1" />
          <NewMessageForm className="mt-auto" />
        </Col>
      </Row>
    </AppContext.Provider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
