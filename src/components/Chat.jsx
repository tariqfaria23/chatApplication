import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import {FaVideo, FaPhone,} from 'react-icons/fa'
import {ChatContext} from '../context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
        <div className="chat-icons">
          <FaVideo className='icon'/>
          <FaPhone className='icon'/>
          <span>...</span>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
