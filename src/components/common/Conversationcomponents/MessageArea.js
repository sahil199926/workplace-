import React from 'react'

function MessageArea({allConversations}) {
  return (
    <div>{
      allConversations&&allConversations.length===0?<div>No messages</div>:
      allConversations&&allConversations.length>0?<div>data</div>:
      <div>Loading...</div>
      }</div>
  )
}

export default MessageArea