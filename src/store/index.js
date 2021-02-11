/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
    nickname: null,
    visibleModalName: null,
    modalData: null,
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
    updateChannel(state, { payload: { id: channelId, ...rest } }) {
      const foundIndex = state.channels.findIndex(({ id }) => id === channelId);
      const foundChannel = state.channels[foundIndex];
      state.channels[foundIndex] = {
        ...foundChannel,
        ...rest,
      };
    },
    removeChannel(state, action) {
      state.channels.push(action.payload);
    },
    setModal(state, action) {
      state.visibleModalName = action.payload;
    },
    setModalData(state, action) {
      state.modalData = action.payload;
    },
  },
});

export const {
  addChannel, addMessage, setChannel, setModal, setModalData, updateChannel, removeChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
