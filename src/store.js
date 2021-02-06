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
      state.channel.push(action.payload);
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { addChannel, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
