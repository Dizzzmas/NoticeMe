import React from 'react';
import Proptypes from 'prop-types';
import { format } from 'date-fns';

const ChatSession = props => {
  const { messages } = props;
  return messages.map(message => {
    const time = format(new Date(`${message.updatedAt}`), 'HH:mm');
     const arr = message.parts.map(p => {
              return (
                <span className="message-text">{p.payload.content}</span>
              );
          });
    return (
      <li className="message" key={message.id}>
        <div>
          <span className="user-id">{message.sender.name}</span>
          <span>{arr}</span>
        </div>
        <span className="message-time">{time}</span>
      </li>
    );
  });
};

ChatSession.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default ChatSession;
