import React from "react";
import { Typography } from "@mui/material";


export const Text = ({ children, variant, align, sx }) => {
  return (
    <Typography variant={variant} align={align} sx={sx}>
      {children}
    </Typography>
  );
};
