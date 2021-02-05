import React from 'react';
import Badge from 'react-bootstrap/Badge';

function Chat({ className = '' }) {
  return (
    <div className={`${className} overflow-auto`}>
      {[...new Array(100)].map(() => (
        <p className="mb-3">
          <Badge variant="secondary">Vadim</Badge>
          <span> : Всем привет!</span>
        </p>
      ))}
    </div>
  );
}

export default Chat;
