import React, { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Table from "../../common/Table";
import toastMessage from "../../../utils/toastMessage";
import {v4 as uuidv4} from 'uuid'
const columns = [
  {
    heading: "Candidate Name",
    key: "candidateName",
    style: {
      width: "20%",
    },
  },
  {
    heading: "Job Title",
    key: "jobTitle",
    style: {
      width: "20%",
    },
  },
  {
    heading: "Intrest Shown",
    key: "createdAt",
    type: "date",
    style: {
      width: "20%",
    },
  },
  {
    heading: "Resume",
    key: "candidateResume",
    style: {
      width: "20%",
    },
    type: "resume",
  },
  {
    heading: "Action",
    style: {
      width: "20%",
    },
    type: "action",
  },
];
function Applicants() {
  const [userState, dispatch] = useContext(userContext);
  const [applicants, setApplicants] = React.useState(null);
  const fetchAllApplicants = async () => {
    // call firestore to get all applicants on jobs which are posted by the current user
    // with the help of the current user's email=== employer's email
    try {
      const q = query(
        collection(db, "applications"),
        where("employerId", "==", userState.userInfo.companyEmail)
      );
      onSnapshot(q, (querySnapshot) => {
        let apps = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          apps.push(doc.data());
        });
        setApplicants(apps);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllApplicants();
  }, []);

  const actionFun = async (data, action) => {
    console.log(data, action);
    const conversationKey=uuidv4()
    const lastMessageId=uuidv4()
    const conversationId=uuidv4()
    const message=`hey ${data.candidateName} your application for the job ${data.jobTitle} has been accepted.`
    if (action === "accept") {
      //1 create a doc in lastmessages collection with a unique conversation key
      try{
      await setDoc(
        doc(
          db,
          "lastMessages",
          lastMessageId
        ),
        {
          candidateName: data.candidateName,
          candidateId: data.candidateId,
          employerId: data.employerId,
          companyName: data.companyName,
          jobTitle: data.jobTitle,
          createdAt: new Date().toISOString(),
          conversationKey,
          lastMessage:message,
          lastMessageId
        }
      )
      //2 create a doc in conversations collection with that unique conversation key
      await setDoc(
        doc(db, "conversations",conversationId),
        {
          conversationKey,
          message,
          createdAt:new Date().toISOString(),
          senderId:data.employerId,
          conversationId
        }
      )
      //3 update the application status to accepted
      await setDoc(
        doc(db, "applications", data.applicationId),
        {
          status: "accepted",
        },{merge:true}
      )
      toastMessage("Application Accepted", "success");
      }
      catch(err){
        console.log(err)
      }


    } else if (action === "reject") {
      // delete this application from the database
      //1 with the document id call the delete function from firebase
      try {
        const docrfe = doc(db, "applications", data.applicationId);
        await deleteDoc(docrfe);
        toastMessage("Application Rejected", "success");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return applicants && applicants.length === 0 ? (
    <div>No Applicants</div>
  ) : applicants && applicants.length > 0 ? (
    <div>
      <Table data={applicants} columns={columns} actionFun={actionFun} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Applicants;
