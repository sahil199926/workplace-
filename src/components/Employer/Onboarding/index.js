import { Grid, TextField } from "@mui/material";
import React, { useContext } from "react";
import "./onboarding.css";
import CommonDropdown from "../../common/CommonDropdown";
import { industryType, companySize } from "../../../constants";
import FileUploader from "../../common/FileUploader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { userContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../utils/toastMessage";
function Onboarding() {
  const navigate = useNavigate();
  const [userState, dispatch] = useContext(userContext);
  const [state, setState] = React.useState({
    companyName: "",
    industryType: "",
    companySize: "",
    companyEmail: userState.user.email,
    name: "",
    role: "",
    companyTagline: "",
    companyBio: "",
    companyWebsite: "",
    companyLogo: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    console.log(state, "state");
    //setDoc(doc ref, data)
    // doc ref doc(db ref , collection name, doc id)
    try {
      const doc_id = userState.user.email;
      await setDoc(doc(db, "userInfo", doc_id), {
        ...state,
        user_id: doc_id,
        userType: "employer",
      });
      dispatch({
        type: "AddUSERINFO",
        payload: {
          ...state,
          user_id: doc_id,
          userType: "employer",
        }
      })
      toastMessage("user onboarding completed", "success");
      navigate("/employer/profile");
    } catch (err) {
      console.log(err);
      toastMessage("something went wrong", "error");
    }
  };
  return (
    <form onSubmit={submit}>
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
          <label className="label">Company Name</label>
          <TextField
            size="small"
            value={state.companyName}
            onChange={(e) =>
              setState({ ...state, companyName: e.target.value })
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="label">industry Type</label>
          <CommonDropdown
            value={state.industryType}
            onChange={(newvalue) =>
              setState({ ...state, industryType: newvalue })
            }
            options={industryType}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Company Size</label>
          <CommonDropdown
            value={state.companySize}
            onChange={(newvalue) =>
              setState({ ...state, companySize: newvalue })
            }
            options={companySize}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Company Email</label>
          <TextField
            size="small"
            disabled
            value={state.companyEmail}
            onChange={(e) =>
              setState({ ...state, companyEmail: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">POC Name</label>
          <TextField
            size="small"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Role</label>
          <TextField
            size="small"
            value={state.role}
            onChange={(e) => setState({ ...state, role: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Company Tagline</label>
          <TextField
            size="small"
            value={state.companyTagline}
            onChange={(e) =>
              setState({ ...state, companyTagline: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Company Bio</label>
          <TextField
            size="small"
            value={state.companyBio}
            onChange={(e) => setState({ ...state, companyBio: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">Company Website</label>
          <TextField
            size="small"
            value={state.companyWebsite}
            onChange={(e) =>
              setState({ ...state, companyWebsite: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <label className="label">Company Logo</label>
          <FileUploader
            value={state.companyLogo}
            onChange={(url) => setState({ ...state, companyLogo: url })}
            fileType="image"
          />
        </Grid>
        <Grid>
          <button type="submit" className="setup-btn">
            Complete Setup
          </button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Onboarding;
