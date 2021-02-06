import { io } from 'socket.io-client';
import { addMessage } from '../store';

export default (store) => {
  const socket = io();
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(addMessage(message));
  });
};
