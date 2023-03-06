import { TextField } from "@mui/material";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebaseConfig";

function FileUploader({ value, onChange, fileType }) {
  const [progress, setProgress] = useState(0);
  const upload = (e) => {
    const file = e.target.files[0];
    console.log(file, "file");

    const storageRef = ref(storage, `${fileType}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + p + "% done");
        setProgress(p);
      },
      (error) => {
        console.log(error, "error");
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onChange(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  return (
    <div>
      {value && (
        <div>
          {fileType === "image" ? (
            <img
              src={value}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <div>Pdf</div>
          )}
        </div>
      )}
      <TextField
        size="small"
        type={"file"}
        onChange={upload}
        fullWidth
        inputProps={{
          accept: fileType === "image" ? "image/*" : "application/pdf",
        }}
      />
    </div>
  );
}

export default FileUploader;
