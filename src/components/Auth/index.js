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

function Auth({ type }) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [state, dispatch] = useContext(userContext);

  const redirectUser = () => {
    if (
      // user exists
      false
    ) {
      if (
        // user exist as candidate but trying to login as employer
        false
      ) {
        //alert user he exist as candidate
      } else if (
        // user exist as employer but trying to login as candidate
        false
      ) {
        //alert user he exist as employer
      } else if (
        // user exist as candidate and trying to login as candidate
        true
      ) {
        // redirect to candidate profile
        navigate("/candidate/profile");
      } else if (
        // user exist as employer and trying to login as employer
        true
      ) {
        // redirect to employer profile
        navigate("/employer/profile");
      }
    } else {
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
        redirectUser();
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
