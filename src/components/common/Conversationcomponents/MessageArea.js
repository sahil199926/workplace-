import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { userContext } from "../../../context/userContext";
import SendIcon from '@mui/icons-material/Send';
import "./conversation.css";

function MessageArea({
  allConversations,
  selectedMessage,
  userType,
  sendMessage,
}) {
  const [message, setMessage] = React.useState("");
  const [userData,dispatch]=useContext(userContext)
  return (
    <div>
      {allConversations && allConversations.length === 0 ? (
        <div>No messages</div>
      ) : allConversations && allConversations.length > 0 ? (
        <div className="message-area-container">
          <div className="message-area-header">
            <h6>
              {userType === "employer"
                ? selectedMessage.candidateName
                : selectedMessage.companyName}
            </h6>
            <h5>{selectedMessage.jobTitle}</h5>
          </div>
          <div className="message-area-all-conversation">
            {allConversations.map((conversation) => {
              return (
                <div
                  className={`message-area-conversation ${
                    conversation.senderId === userData.user.email &&
                    "message-area-conversation-sender"
                  }`}
                >
                  <p>{conversation.message}</p>
                </div>
              );
            })}
          </div>
          <div className="message-area-text-area">
            <TextField
            size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
            />
            <button
            disabled={message.length===0}
              onClick={() => {
                sendMessage(message,setMessage);
              }}
            >
             <span> send</span> <span><SendIcon/></span>
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default MessageArea;
