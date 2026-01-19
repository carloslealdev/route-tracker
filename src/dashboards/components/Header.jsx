import { Typography } from "@mui/material";
import React from "react";

export const Header = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h4" sx={{ color: "white" }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ color: "green" }}>
        {subtitle}
      </Typography>
    </>
  );
};
