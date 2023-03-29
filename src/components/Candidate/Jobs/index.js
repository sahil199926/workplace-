import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import JobCard from "./JobCard";
import { userContext } from "../../../context/userContext";
import { v4 as uuidv4 } from "uuid";
import toastMessage from "../../../utils/toastMessage";
function Jobs() {
  const [jobs, setJobs] = React.useState(null);
  const [userstate, dispatch] = useContext(userContext);
  const fetchJobs = async () => {
    // call firestore to fetch all jobs accros all imployers
    const collectionRef = collection(db, "jobs");
    const datasnap = await getDocs(collectionRef);
    let job = [];
    datasnap.forEach((doc) => {
      console.log(doc.data());
      job.push(doc.data());
    });
    setJobs(job);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const applyonJob = async (job) => {
    console.log(job);
    //1 check if this user have already applied on this job or not
    //1.1 fetch all applications of this user ( whrer candidateId = userstate.userInfo.email)
    //1.2 check if fetched jobs from above point contains job.jobId is equal to job.jobId
    //1.3 if yes then show toast message that you have already applied on this job
    //1.4 if no then go to point 2

    //2 create a new application in applications collection

    const q = query(
      collection(db, "applications"),
      where("candidateId", "==", userstate.userInfo.email)
    );
    const dataref = await getDocs(q);
    let applications = [];
    dataref.forEach((doc) => {
      applications.push(doc.data());
    });

    let exist = applications.find((application) => {
      return application.jobId === job.jobId;
    });
    if (exist) {
      toastMessage("You have already applied on this job", "error");
    return
    }

    const applicationId = uuidv4();
    try {
      await setDoc(doc(db, "applications", applicationId), {
        applicationId,
        createdAt: new Date(),
        jobId: job.jobId,
        employerId: job.employerId,
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        status: "applied",
        candidateResume: userstate.userInfo.resume,
        candidateName: userstate.userInfo.name,
        candidateId: userstate.userInfo.email,
      });
      toastMessage("Applied Successfully", "success");
    } catch (err) {
      console.log(err);
      toastMessage("Something went wrong", "error");
    }
  };
  return jobs && jobs.length === 0 ? (
    <h3>No Jobs</h3>
  ) : jobs && jobs.length > 0 ? (
    <div>
      {jobs.map((job, i) => {
        return <JobCard key={i} job={job} applyonJob={applyonJob} />;
      })}
    </div>
  ) : (
    <h3>loading</h3>
  );
}

export default Jobs;
