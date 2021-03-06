import React, { useEffect, useRef, useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import AppContext from '../context';

function Chat({ className = '', messages }) {
  const { nickname: currentNickname } = useContext(AppContext);

  const container = useRef(null);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages.length]);

  return (
    <div ref={container} className={`${className} overflow-auto`}>
      {messages.map(({ id, body, nickname }) => (
        <p key={id} className="mb-3 text-break">
          <Badge variant={currentNickname === nickname ? 'primary' : 'secondary'}>
            {nickname}
          </Badge>
          <span> : </span>
          <span>{body}</span>
        </p>
      ))}
    </div>
  );
}

export default Chat;
