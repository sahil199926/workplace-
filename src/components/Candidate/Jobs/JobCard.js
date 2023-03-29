import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./job.css";
function JobCard({ job,applyonJob }) {
  return (
    <div className="card-container">
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "15px 10px 20px 10px",
        }}
      >
        <Grid item xs={3}>
          <img src={job.companyLogo} alt="company logo" width={"55px"} />
        </Grid>
        <Grid className="company-info" item xs={8}>
          <h2>{job.companyName}</h2>
          <h3>{job.companyTag}</h3>
          <h4>{job.companySize} employees</h4>
        </Grid>
        <Grid item xs={1}>
          <div
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
          }}
          >
            <LocationOnIcon/>
            {
              job.location
            }
          </div>
          </Grid>

      </Grid>
      <Grid className="job-info" container>
        <Grid xs={8} md={3}>
          {job.jobTitle}
        </Grid>
        <Grid xs={4} md={1}>
          - {job.jobLocation}
        </Grid>
        <Grid xs={8} md={4}
        sx={{
          fontSize:'clamp(10px, 1vw, 16px)'
        }}
        >
          {`• ${job.salary.currency} ${job.salary.min}-${job.salary.max}`}
        </Grid>
        <Grid xs={4} md={2}>
          {moment(job.createdAt.toDate()).startOf("day").fromNow()}
        </Grid>
        <Grid xs={12} md={2}>
          <button
          onClick={()=>applyonJob(job)}
          className="apply-btn">Apply</button>
        </Grid>
      </Grid>
    </div>
  );
}


export default JobCard