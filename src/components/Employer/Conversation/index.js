import { Grid } from "@mui/material";
import { addDoc, collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../firebaseConfig";
import Sidebar from "../../common/Conversationcomponents/Sidebar";
import MessageArea from "../../common/Conversationcomponents/MessageArea";
import {v4 as uuidv4} from 'uuid'
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
    );
    onSnapshot(q, (snapshot) => {
      let conversations = [];
      snapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
      console.log(conversations);
      conversations.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
      setAllConversations(conversations);
    });
  };
  useEffect(() => {
    fetchAlllastMessages();
  }, []);
  const selectAMessage = (message) => {
    setSelectedMessage(message);
    setMobileviewSidebar(false);
  };

  useEffect(() => {
    if (selectedMessage) {
      setAllConversations(null)
      fetchAllConversation();
    }
  }, [selectedMessage]);
  const sendMessage = async (message, setMessage) => {
    console.log(message);
    const conversationid = uuidv4()
    try{
      // add a new doc on conversation collection with conversationKey for selected message
      await setDoc(
        doc(db, "conversations",conversationid ),
        {
          conversationKey: selectedMessage.conversationKey,
          message: message,
          senderId: userState.user.email,
          createdAt: new Date().toISOString(),
          conversationid
        }
      )
      setMessage("");
      // update the last message on last message collection
      await setDoc(
        doc(db, "lastMessages", selectedMessage.lastMessageId),{
          lastMessage:message,
          createdAt:new Date().toISOString()
        },{merge:true}
      )
    }
    catch(err){
      console.log(err)
    }
   
  };
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
        <Sidebar
          allLastmessages={allLastmessages}
          userType={"employer"}
          onSelect={selectAMessage}
          selectedMessage={selectedMessage}
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
        {selectedMessage ? (
          <MessageArea
            allConversations={allConversations}
            selectedMessage={selectedMessage}
            userType={"employer"}
            sendMessage={sendMessage}
          />
        ) : (
          <div>select a message</div>
        )}
      </Grid>
    </Grid>
  );
}

export default Conversation;
