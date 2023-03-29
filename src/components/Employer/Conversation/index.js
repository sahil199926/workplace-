import { Grid } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../firebaseConfig";
import Sidebar from "../../common/Conversationcomponents/Sidebar";
import MessageArea from "../../common/Conversationcomponents/MessageArea";
function Conversation() {
  const [userState, dispatch] = useContext(userContext);
  const [mobileviewSidebar, setMobileviewSidebar] = React.useState(true);
  const [allLastmessages, setAllLastMessages] = React.useState(null);
  const [allConversations, setAllConversations] = React.useState(null);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const fetchAlllastMessages = async () => {
    const q = query(
      collection(db, "lastMessages"),
      where("employerId", "==", userState.user.email)
    );
    onSnapshot(q, (snapshot) => {
      let lastMessages = [];
      snapshot.forEach((doc) => {
        lastMessages.push(doc.data());
      });
      console.log(lastMessages);
      setAllLastMessages(lastMessages);
    });
  };
  const fetchAllConversation = async () => {
    const q = query(
      collection(db, "conversations"),
      where("conversationKey", "==", selectedMessage.conversationKey)
    )
    onSnapshot(q, (snapshot) => {
      let conversations = [];
      snapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
      console.log(conversations);
      setAllConversations(conversations);
    })
  }
  useEffect(() => {
    fetchAlllastMessages();
  }, []);
  const selectAMessage = (message) => {
    setSelectedMessage(message);
    setMobileviewSidebar(false);
  }

  useEffect(() => {
    if(selectedMessage){
      fetchAllConversation();
    }
  }, [selectedMessage]);
  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          display: { xs: mobileviewSidebar ? "block" : "none", md: "block" },
        }}
        item
        xs={12}
        md={3}
      >
        <Sidebar allLastmessages={allLastmessages} userType={'employer'}
        
        onSelect={selectAMessage}
        />
      </Grid>
      <Grid
        sx={{
          display: { xs: !mobileviewSidebar ? "block" : "none", md: "block" },
        }}
        item
        xs={12}
        md={9}
      >
        {
          selectedMessage?(<MessageArea 
            allConversations={allConversations}
            />):(<div>select a message</div>)
        }
        
      </Grid>
    </Grid>
  );
}

export default Conversation;
