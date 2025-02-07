import React from 'react'
import ChatBotIcon from './ChatBotIcon'


const ChatMessage = ({chat}) => {
  return (
    <div>
    {/* User Message */}
    <div className={`message ${chat.role==="model"?'bot':'user'}-message`}>
    {chat.role==="model"&& <ChatBotIcon/>}
      <p className="message-text">{chat.text}</p>
    </div></div>
  )
}

export default ChatMessage