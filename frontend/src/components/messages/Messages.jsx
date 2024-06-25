import React from 'react';
import "./Messages.css";
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const {messages, loading} = useGetMessages()  
  useListenMessages()

  return (
    <div className='messages-container'>
      <div className='messages'>
        {
          messages.length === 0 && (
            <p>Send a message to start the conversation</p>
          )
        }
        {
          messages.length !== 0 && messages.map((message) => (
            <Message key={message._id} message={message}/>
          ))
        }
      </div>
    </div>
  );
}

export default Messages;
