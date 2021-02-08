/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
    nickname: null,
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
  },
});

export const { addChannel, addMessage, setChannel } = chatSlice.actions;

export default chatSlice.reducer;
