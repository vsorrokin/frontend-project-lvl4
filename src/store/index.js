/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    renameChannel(state, { payload: { id: channelId, name } }) {
      const foundChannel = state.channels.find(({ id }) => id === channelId);
      foundChannel.name = name;
    },
    removeChannel(state, { payload: channelId }) {
      if (state.currentChannelId === channelId) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
      state.channels = state.channels
        .filter(({ id }) => id !== channelId);
      state.messages = state.messages
        .filter(({ channelId: msgChannelId }) => msgChannelId !== channelId);
    },
  },
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visibleModalName: null,
    modalData: null,
  },
  reducers: {
    openModal(state, { payload: { name, data = null } }) {
      state.visibleModalName = name;
      state.modalData = data;
    },
    closeModal(state) {
      state.visibleModalName = null;
      state.modalData = null;
    },
  },
});

export const {
  addChannel, addMessage, setChannel, renameChannel, removeChannel,
} = chatSlice.actions;

export const {
  openModal, closeModal,
} = modalSlice.actions;

export default {
  chat: chatSlice.reducer,
  modal: modalSlice.reducer,
};
