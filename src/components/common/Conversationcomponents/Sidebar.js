import React from "react";

function Sidebar({ allLastmessages, userType,onSelect }) {
  return (
    <div>
      {allLastmessages && allLastmessages.length == 0 ? (
        <div>No messages</div>
      ) : allLastmessages && allLastmessages.length > 0 ? (
        <div>
          {allLastmessages.map((message) => {
            return (
              <div 
              onClick={() => onSelect(message)}
              >
                <div>
                  {userType === "employer"
                    ? message["candidateName"]
                    : message["companyName"]}
                </div>
                <div>{message.lastMessage}</div>
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
