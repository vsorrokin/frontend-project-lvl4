import Cookies from 'js-cookie';
import faker from 'faker';
import { io } from "socket.io-client";

const initNickname = () => {
  if (Cookies.get('nickname')) {
    return;
  }

  Cookies.set('nickname', faker.name.findName().replaceAll(' ', '_'));
};

export default () => {
  initNickname();
  const socket = io();
  socket.on('newMessage', (data) => {
    console.log(data);
  });
};
