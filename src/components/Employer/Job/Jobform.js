import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import CommonSearchDropdown from "../../common/CommonSearchDropdown";
import CommonDropdown from "../../common/CommonSearchDropdown";
import { primary_role,currency,experience,jobType } from "../../../constants";
import {v4 as uuidv4} from 'uuid'
import {userContext} from '../../../context/userContext'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import toastMessage from '../../../utils/toastMessage'
function Jobform({ postAjob }) {
  const [userState, dispatch] = React.useContext(userContext);
  const [jobdata, setJobdata] = React.useState({
    jopType: "",
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    primary_role: "",
    experience: "",
    salary: {
      min: "",
      max: "",
      currency: "",
    },
    skills: [],
  });
  const submit = async(e) => {
    e.preventDefault();
    console.log(jobdata);

    // call firebase jobs collection and add jobdata
    const jobId=uuidv4();
    try{
    setDoc(
      doc(db, "jobs", jobId),
      {
        ...jobdata,
        jobId,
        createdAt: new Date(),
        companyName:userState.userInfo.companyName,
        employerId:userState.userInfo.companyEmail,
        companyLogo:userState.userInfo.companyLogo,
        companytagline:userState.userInfo.companyTagline,
        companySize:userState.userInfo.companySize,
      }
    )
    toastMessage("Job Posted Successfully", "success");
    }
    catch(err){
      console.log(err)
      toastMessage("Something went wrong", "error");
    }
  };
  const setSkill = (skill) => {
    if (jobdata.skills.includes(skill)) {
    } else {
      setJobdata({ ...jobdata, skills: [...jobdata.skills, skill] });
    }
  };
  const onDelete = (skill) => {
    setJobdata({
      ...jobdata,
      skills: jobdata.skills.filter((item) => item !== skill),
    });
  };
  return (
    <div>
      <Button
        onClick={postAjob}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        back
      </Button>

      <form onSubmit={(e) => submit(e)}>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "1200px",
            width: "90%",
            margin: "auto",
          }}
        >
          <Grid item xs={12} md={6}>
            <label className="label">Job type</label>
            <CommonDropdown
              value={jobdata.jopType}
              onChange={(newvalue) =>
                setJobdata({ ...jobdata, jopType: newvalue })
              }
              options={jobType}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="label">jobTitle</label>
            <TextField
            
              size="small"
              value={jobdata.jobTitle}
              onChange={(e) =>
                setJobdata({ ...jobdata, jobTitle: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="label">job Location</label>
            <TextField
              size="small"
              value={jobdata.jobLocation}
              onChange={(e) =>
                setJobdata({ ...jobdata, jobLocation: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="label">location</label>
            <TextField
              size="small"
              value={jobdata.location}
              onChange={(e) =>
                setJobdata({ ...jobdata, location: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="label">primary role</label>
            <CommonDropdown
              value={jobdata.primary_role}
              onChange={(newvalue) =>
                setJobdata({ ...jobdata, primary_role: newvalue })
              }
              options={primary_role}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="label">experience</label>
            <CommonDropdown
              value={jobdata.experience}
              onChange={(newvalue) =>
                setJobdata({ ...jobdata, experience: newvalue })
              }
              options={experience}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="label">Salary</label>
            <Grid container
            columnSpacing={2}
            >
              <Grid item xs={4}>
                <CommonDropdown
                  value={jobdata.salary.currency}
                  onChange={(newvalue) =>
                    setJobdata({
                      ...jobdata,
                      salary: { ...jobdata.salary, currency: newvalue },
                    })
                  }
                  options={currency}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                
                  multiline
                  value={jobdata.salary.min}
                  onChange={(e) =>
                    setJobdata({
                      ...jobdata,
                      salary: { ...jobdata.salary, min: e.target.value },
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
              <TextField
                  size="small"
                  
                  multiline
                  value={jobdata.salary.max}
                  onChange={(e) =>
                    setJobdata({
                      ...jobdata,
                      salary: { ...jobdata.salary, max: e.target.value },
                    })
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <label className="label">jobDescription</label>
            <TextField
              size="small"
              minRows={3}
              multiline
              value={jobdata.jobDescription}
              onChange={(e) =>
                setJobdata({ ...jobdata, jobDescription: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <label className="label">skills</label>
            <CommonSearchDropdown
              options={["react", "node", "js", "css", "html", "python", "java"]}
              onChange={(newvalue) => setSkill(newvalue)}
              values={jobdata.skills}
              onDelete={onDelete}
            />
          </Grid>

          <Grid>
            <button type="submit" className="setup-btn">
              Post a job
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Jobform;
