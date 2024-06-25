import React, { useState } from 'react'
import "./MessageInput.css"
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

function MessageInput() {

  const [message, setMessage] = useState("")
  const {loading, sendMessage} = useSendMessage()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!message)
    {
      return
    }
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <div>
        <input type='text' placeholder='Send a message' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type='submit'>
          <BsSend />
        </button>
      </div>
    </form>
  )
}

export default MessageInput