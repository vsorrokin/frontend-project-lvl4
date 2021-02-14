import { io } from 'socket.io-client';
import { addMessage, addChannel, removeChannel, updateChannel } from '../store';

export default (store) => {
  const socket = io();
  socket.on('newMessage', ({ data: { attributes: message } }) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ data: { attributes: channel } }) => {
    store.dispatch(updateChannel({
      id: channel.id,
      name: channel.name,
    }));
  });
};
