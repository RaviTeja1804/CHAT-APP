import React, { useContext } from 'react'
import "./Conversation.css"
import useConversation from '../../zustand/useConversation.js'
import SocketContext from '../../context/socketContext.jsx'

function Coversation({key, conversation, index, emoji}) {

  const {selectedConversation, setSelectedConversation} = useConversation()
  const {onlineUsers} = useContext(SocketContext)

  const isSelected = selectedConversation?._id === conversation._id
  const isOnline = onlineUsers.includes(conversation._id)

  const statusClass = isOnline ? "status-indicator-online" : "status-indicator-offline"

  return (
    <div onClick={() => setSelectedConversation(conversation)} className="conversation">
        <div className={`eachConvo ${isSelected ? "bgSky" : ""}`}>
            <div className="avatar-container">
              <img src={conversation.profilePic} alt="Avatar" class="avatar" />
              <span class={statusClass}></span>
            </div>

            <div className="nameEmoji1">
                <div className='nameEmoji2'>
                    <p className='name'>{conversation.fullName}</p>
                    <span className='emoji'>{emoji}</span>
                </div>
            </div>
        </div>

        {!index && <div className="divider2" />}
    </div>
  )
}

export default Coversation