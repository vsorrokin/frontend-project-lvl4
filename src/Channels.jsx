import React from 'react';

function Channels({ data: list }) {
  return (
    <ul className="channels">
      {list.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default Channels;
