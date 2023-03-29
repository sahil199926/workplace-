import moment from "moment";
import React from "react";
import './conversation.css';
function Sidebar({ allLastmessages, userType,onSelect,selectedMessage }) {
  return (
    <div
    className="sidebar-container"
    >
      {allLastmessages && allLastmessages.length == 0 ? (
        <div>No messages</div>
      ) : allLastmessages && allLastmessages.length > 0 ? (
        <div>
          {allLastmessages.map((message) => {
            return (
              <div 
              className={`message ${selectedMessage&&selectedMessage.lastMessageId===message.lastMessageId&&"select-message"}`}
              onClick={() => onSelect(message)}
              >
                <h6>
                  {userType === "employer"
                    ? message["candidateName"]
                    : message["companyName"]}
                    <div>{moment(message.createdAt).format('LT')}</div>
                </h6>
                <p>{message.lastMessage}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Sidebar;
