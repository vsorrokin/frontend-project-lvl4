import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import Input from './Input';

function App({ data: { channels } }) {
  return (
    <div className="App">
      <Channels data={channels} />
      <Chat />
      <Input />
    </div>
  );
}

export default App;
