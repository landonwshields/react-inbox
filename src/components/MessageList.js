import React from 'react';
import Message from './Message';


const MessageList = ({messages}) => {
  console.log(messages);
  const messageData = messages.map(message => (
    <Message
      key={message.id}
      message={message}
    />
  ))
  console.log(messageData);

  return(
    <div>
      {messageData}
    </div>
  )
}


export default MessageList
