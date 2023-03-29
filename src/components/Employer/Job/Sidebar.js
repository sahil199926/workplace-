import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { userContext } from "../../../context/userContext";
import { db } from "../../../firebaseConfig";
import Sidebarcard from "./Sidebarcard";

const mockData = [
  {
    createdAt: "2-feb",
    jobTitle: "Frontend Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "12nu3456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "backend Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "12un3456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "Fullstack Developer",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "123onun456",
  },
  {
    createdAt: "2-feb",
    jobTitle: "Frontend Developer-2",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "1234iu56",
  },
  {
    createdAt: "2-feb",
    jobTitle: "SDE-1",
    jobType: "Full Time",
    jobLocation: "delhi",
    jobId: "123ouij456",
  },
];
function Sidebar({ postAjob, selectThisJob, selectedJob }) {
  const [userState, dispatch] = useContext(userContext);
  const [alljobs, setAllJobs] = React.useState(null);
  const getallJobs = () => {
    const employerId = userState.user.email;
    // call firebase jobs collection and get all jobs posted by current user id
    // create a condiiton to fetch all the jobs posted by current user
    const q = query(
      // collection ref
      collection(db, "jobs"),
      where("employerId", "==", employerId)
      // condition ref
    );
    onSnapshot(q, (snapshot) => {
      const jobs = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
    });
  };
  useEffect(() => {
    getallJobs();
  }, []);
  return alljobs && alljobs.length == 0 ? (
    <h3>no data</h3>
  ) : alljobs && alljobs.length > 0 ? (
    <div>
      <button
      className="post-job-btn"
      onClick={postAjob}>
        <div>+ Post a Job</div>
        <p>Post your requirements and hire candidates</p>
      </button>
      {alljobs.map((item, index) => {
        return (
          <Sidebarcard
            key={index}
            item={item}
            selectThisJob={selectThisJob}
            selectedJob={selectedJob}
          />
        );
      })}
    </div>
  ) : (
    <h3>loading</h3>
  );
}

export default Sidebar;
