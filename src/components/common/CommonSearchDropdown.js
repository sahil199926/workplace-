import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";

function CommonSearchDropdown({ options, onChange, values, onDelete }) {
  return (
    <>
      <Autocomplete
        disablePortal
        onChange={(event, newValue) => onChange(newValue)}
        id="combo-box-demo"
        size="small"
        options={options}
        fullWidth
        renderInput={(params) => <TextField
          value={values}
          {...params} />}
      />
      <div
        style={{
          margin: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* {values.map((value) => {
          return (
            <Chip key={value} onClick={() => onDelete(value)} label={value} />
          );
        })} */}
      </div>
    </>
  );
}

export default CommonSearchDropdown;
