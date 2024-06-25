import React from 'react'
import SearchInput from './SearchInput'
import "./Sidebar.css"
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

function Sidebar() {
  return (
    <div className='sidebar'>
        <SearchInput />
        <div className="divider" />
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar