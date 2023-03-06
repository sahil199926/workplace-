import React from "react";
import Sidebar from "./Sidebar";
import Jobform from "./Jobform";
import { Grid } from "@mui/material";
function Job() {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [selectedJob, setSelectedJob] = React.useState(null)
  const postAjob = () => {
    setShowSidebar(!showSidebar);
  }
  const selectThisJob = (job) => {
    setSelectedJob(job)
  }
  return (
    <Grid container spacing={1}>
      <Grid
        sx={{
          display: { xs: showSidebar ? "block" : "none", sm: "block" },
        }}
        item
        xs={12}
        sm={3}
      >
        <Sidebar postAjob={postAjob} selectThisJob={selectThisJob} selectedJob={selectedJob} />
      </Grid>
      <Grid
        sx={{
          display: { xs: !showSidebar ? "block" : "none", sm: "block" },
        }}
        item
        xs={12}
        sm={9}
      >
        <Jobform postAjob={postAjob}  />
      </Grid>
    </Grid>
  );
}

export default Job;
