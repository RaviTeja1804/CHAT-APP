import React from 'react'
import "./Home.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

function Home() {
  return (
    <div className='home'>
        <Sidebar />
        <div className="divider3"></div>
        <MessageContainer />
    </div>
  )
}

export default Home