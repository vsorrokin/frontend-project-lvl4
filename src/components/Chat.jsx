import React from 'react';
import Badge from 'react-bootstrap/Badge';

function Chat({ className = '', messages }) {
  return (
    <div className={`${className} overflow-auto`}>
      {messages.map(({ id, body, nickname }) => (
        <p key={id} className="mb-3">
          <Badge variant="secondary">{nickname}</Badge>
          <span> : </span>
          <span>{body}</span>
        </p>
      ))}
    </div>
  );
}

export default Chat;
