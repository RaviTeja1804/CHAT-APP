import React, { useState } from 'react'
import "./MessageContainer.css"
import Messages from './Messages'
import MessageInput from './MessageInput'
import NoChat from './NoChat'
import useConversation from '../../zustand/useConversation'

function MessageContainer() {
  const {selectedConversation, setSelectedConversation} = useConversation()
  return (
    <div className='messageContainer'>
    {!selectedConversation ? <NoChat /> : (
      
        <div className="msgBox">
          <div className='messageHeader'>
            <span className='labelText'>To:</span>&nbsp;&nbsp;<span className='recipientName'>{selectedConversation.fullName}</span>
          </div>

          <Messages />
          <MessageInput/>

        </div>
    )}
    </div>
  )
}

export default MessageContainer