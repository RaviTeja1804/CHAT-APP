import React, { useContext } from 'react'
import './NoChat.css'
import {TiMessages} from "react-icons/ti"
import AuthContext from '../../context/AuthContext'

function NoChat() {

  const {authUser} = useContext(AuthContext)

  return (
    <div className='welcome-container'>
        <div className='welcome-text'>
            <p>Welcome 👋 {authUser.fullName} ❄</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className='welcome-icon' />
        </div>
    </div>
  )
}

export default NoChat