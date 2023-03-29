import { Button, Grid, Pagination } from "@mui/material";
import React from "react";
import authimg from "../../assets/authimg.png";
import googlebtn from "../../assets/google-btn.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../../firebaseConfig'
import toastMessage from "../../utils/toastMessage";
function Auth({ type }) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [state, dispatch] = useContext(userContext);

  const redirectUser = async(email) => {
    // with email we can check if user exist or not from users collection
    const doc_ref=doc(db,"userInfo",email)
    const userdata= await getDoc(doc_ref)
    let userExist=null
    if(userdata.exists()){
      userExist=userdata.data()
    }

    if (
      // user exists
      userExist
    ) {
      if (
       // if userType in db is equal to the type of auth component
        userExist.userType===type
      ) {
        dispatch({
          type: "ADDUSERINFO",
          payload: userExist,
        });
        navigate(`/${type}/profile`);
        
      } 
      else{
        // if userType in db is not equal to the type of auth component
        toastMessage('error',`you are not ${type} please login with ${type} account`,'danger')
      }
    }
     else {
      // user doesn't exist
      if (type === "candidate") {
        // redirect to candidate onboarding
        navigate("/candidate/onboarding");
      } else {
        // redirect to employer onboarding
        navigate("/employer/onboarding");
      }
    }
  };
  const signIn = () => {
    // auth and provider are from firebase

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        console.log(result);
        const { user } = result;
        const { displayName, email, photoURL, uid } = user;
        dispatch({
          type: "LOGIN",
          payload: {
            displayName,
            email,
            photoURL,
            uid,
          },
        });
        redirectUser(email);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Grid container>
      <Grid className="auth-btn-container" item xs={12} md={8}>
        <h1>welcome {type}</h1>
        <h3>please Sign IN</h3>
        <div onClick={signIn} className="auth-btn">
          <img src={googlebtn} alt="googlebtn" />
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div>
          <img width="100%" src={authimg} alt="authimg" />
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;
