import React from "react";
import { Box, Typography } from "@mui/material";
import RouteIcon from "@mui/icons-material/Route";

export const TotalRoutegrams = ({ totalRoutegrams }) => {
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
          <RouteIcon
            sx={{
              p: "10px",
              boxSizing: "content-box",
              fontSize: "40px",
              borderRadius: "8px",
              backgroundColor: "#1a2c4088",
              color: "#197fe6",
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
            Total Rutagramas
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
              {totalRoutegrams}
            </Typography>
            <Box component="span" sx={{ color: "white" }}>
              rutagramas registrados
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
