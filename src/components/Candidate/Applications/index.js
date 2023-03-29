import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../firebaseConfig";
import Table from "../../common/Table";
import "./application.css";
const columns = [
  {
    heading: "Company Name",
    key: "companyName",
    style: {
      width: "25%",
    },
  },
  {
    heading: "Job Title",
    key: "jobTitle",
    style: {
      width: "25%",
    },
  },
  {
    heading: "Intrest Shown",
    key: "createdAt",
    type: "date",
    style: {
      width: "25%",
    },
  },
  {
    heading: "Status",
    key: "status",
    style: {
      width: "25%",
    },
  },
];
function Applications() {
  const [userstate, dispatch] = useContext(userContext);
  const [AllApplications, setAllApplications] = React.useState(null);
  const fetchAllApplications = async () => {
    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userstate.userInfo.email)
    );
    const dataref = await getDocs(q);
    let applications = [];
    dataref.forEach((doc) => {
      applications.push(doc.data());
      console.log(doc.data());
    });
    setAllApplications(applications);
  };
  useEffect(() => {
    fetchAllApplications();
  }, []);

  return AllApplications && AllApplications.length == 0 ? (
    <h1>No Applications</h1>
  ) : AllApplications && AllApplications.length > 0 ? (
    <div
      style={{
        maxWidth: "90%",
        margin: "20px auto",
      }}
    >
      <Table columns={columns} data={AllApplications} />
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Applications;
