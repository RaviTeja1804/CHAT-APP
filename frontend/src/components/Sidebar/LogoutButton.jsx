import React from 'react'
import { BiLogOut } from "react-icons/bi";
import "./LogoutButton.css"
import useLogout from '../../hooks/useLogout';
import useConversation from '../../zustand/useConversation';

function LogoutButton() {

  const {logout} = useLogout()
  const {selectedConversation, setSelectedConversation} = useConversation()

  return (
    <div className='logoutBtn'>
      <BiLogOut className='logout' onClick={() => {logout();setSelectedConversation(null)}}/>
    </div>
  )
}

export default LogoutButton