import React from 'react'
import Conversation from './Conversation'
import "./Conversations.css"
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'

function Coversations() {

  const [loading, conversations] = useGetConversations()

  return (
    <div className='allConvo'>
        {conversations.map((conversation, i) => (
          <Conversation key={conversation._id} conversation={conversation} index={i === conversations.length - 1} emoji={getRandomEmoji()}/>
        ))}
    </div>
  )
}

export default Coversations