import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TimeframeSelector = ({ value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="timeframe-label">Timeframe</InputLabel>
      <Select
        labelId="timeframe-label"
        value={value}
        onChange={onChange}
        label="timeframe"
      >
        <MenuItem value="3">Last 3 Months</MenuItem>
        <MenuItem value="6">Last 6 Months</MenuItem>
        <MenuItem value="12">Last 12 Months</MenuItem>
        <MenuItem value="all">All</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TimeframeSelector;
