import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CommonDropdown({
  value,
  onChange,
  options,
}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
        size='small'

          id="demo-simple-select"
          value={value}
         
          onChange={(e)=>onChange(e.target.value)}
        >
          {
            options.map((item) => {
              return(
                <MenuItem value={item}>{item}</MenuItem>
              )
            })
          }
        
        </Select>
      </FormControl>
    </Box>
  );
}

export default CommonDropdown