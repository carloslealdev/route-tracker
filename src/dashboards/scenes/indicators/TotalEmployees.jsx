import React from "react";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

export const TotalEmployees = ({ totalEmployees }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Icono */}
        <Box>
          <PeopleIcon
            sx={{
              p: "10px",
              boxSizing: "content-box",
              fontSize: "40px",
              borderRadius: "8px",
              backgroundColor: "#0bda5b10",
              color: "#0bda5b",
            }}
          />
        </Box>

        {/* Indicador */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              color: "#9dabb8",
            }}
          >
            Total Empleados
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {totalEmployees}
            </Typography>
            <Box component="span" sx={{ color: "white" }}>
              empleados activos
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
