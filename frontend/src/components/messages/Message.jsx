import React, { useContext } from "react";
import "./Message.css";
import { AuthContext } from '../../context/AuthContext'
import useConversation from "../../zustand/useConversation";

function Message({key, message}) {

  const {authUser} = useContext(AuthContext)
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id

  const chat_end = fromMe ? 'chat-end1' : 'chat-end2'
  const chat_bubble = fromMe ? 'chat-bubble1' : 'chat-bubble2'
  const chat_footer = fromMe ? 'chat-footer1' : 'chat-footer2'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const chat_container = fromMe ? 'chat-container1' : 'chat-container2'
  const shakeClass = message.shouldShake ? "shake" : ""

  function getISTDateTimePart(dateTimeString) {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    
    const offset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const istDate = new Date(date.getTime() + offset);
    
    const datePart = dateTimeString.substring(0, 10);
    
    const hours = istDate.getUTCHours().toString().padStart(2, '0');
    const minutes = istDate.getUTCMinutes().toString().padStart(2, '0');
    
    return `${datePart}  ${hours}:${minutes}`;
}

  return (
    <div className={chat_container}>
      <div className={chat_end}>
        <div className="chat-image avatar">
          <div className="avatar-image">
            <img alt="profile pic" src={profilePic} />
          </div>
        </div>
        <div className={`${chat_bubble} ${shakeClass}`}>{message.message}</div>
      </div>
      <div className={chat_footer}>{getISTDateTimePart(message.createdAt)}</div>
    </div>
  );
}

export default Message;
