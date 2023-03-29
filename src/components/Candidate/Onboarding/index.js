import { Grid, TextField } from "@mui/material";
import React, { useContext } from "react";
import "./onboarding.css";
import CommonDropdown from "../../common/CommonDropdown";
import { primary_role } from "../../../constants";
import FileUploader from "../../common/FileUploader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { userContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import toastMessage from "../../../utils/toastMessage";
import CommonSearchDropdown from "../../common/CommonSearchDropdown";
function Onboarding() {
  const navigate = useNavigate();
  const [userState, dispatch] = useContext(userContext);
  const [state, setState] = React.useState({
    name: "",
    email: userState.user.email,
    phone: "",
    location: "",
    primary_role: "",
    linkedin: "",
    skills:[],
    bio: "",
    resume: "",

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
        userType: "candidate",
      });
      dispatch({
        type: "AddUSERINFO",
        payload: {
          ...state,
          user_id: doc_id,
          userType: "candidate",
        }
      })
      toastMessage("user onboarding completed", "success");
      navigate("/candidate/profile");
    } catch (err) {
      console.log(err);
      toastMessage("something went wrong", "error");
    }
  };
  const setSkill=(skill)=>{
    if(state.skills.includes(skill)){
      //
    }
    else{
      setState({...state,skills:[...state.skills,skill]})
    }

  }
  const onDelete=(skill)=>{
    setState({...state,skills:state.skills.filter((item)=>item!==skill)})
  }
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
          <label className="label">Name</label>
          <TextField
            size="small"
            value={state.name}
            onChange={(e) =>
              setState({ ...state, name: e.target.value })
            }
            fullWidth
          />
        </Grid>

       
        <Grid item xs={12} md={6}>
          <label className="label">Email</label>
          <TextField
          disabled
            size="small"
            value={state.email}
            onChange={(e) =>
              setState({ ...state, email: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">contact</label>
          <TextField
            size="small"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">location</label>
          <TextField
            size="small"
            value={state.location}
            onChange={(e) => setState({ ...state, location: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="label">primary role</label>
          <CommonDropdown
            value={state.primary_role}
            onChange={(newvalue) =>
              setState({ ...state, primary_role: newvalue })
            }
            options={primary_role}
          />
        </Grid>
          
        <Grid item xs={12} md={6}>
          <label className="label">linkedin</label>
          <TextField
            size="small"
            value={state.linkedin}
            onChange={(e) => setState({ ...state, linkedin: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <label className="label">Bio</label>
          <TextField
            size="small"
            minRows={3}
            multiline
            value={state.bio}
            onChange={(e) => setState({ ...state, bio: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <label className="label">skills</label>
          <CommonSearchDropdown
          options={["react","node","js","css","html","python","java"]}
          onChange={(newvalue) => setSkill(newvalue)}
          values={state.skills}
          onDelete={onDelete}
          />
          </Grid>

        <Grid item xs={12}>
          <label className="label">resume</label>
          <FileUploader
            value={state.resume}
  
            onChange={(url) => setState({ ...state, resume: url })}
            fileType="file"
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
