import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthSelector = ({ value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="Month-label">Month</InputLabel>
      <Select
        labelId="Month-label"
        value={value}
        onChange={onChange}
        label="Month"
      >
        {months.map((month, index) => (
          <MenuItem value={index + 1} key={index + 1}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
