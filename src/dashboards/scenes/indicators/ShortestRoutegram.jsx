import React from "react";
import { Box, Typography } from "@mui/material";
import LocationPinIcon from "@mui/icons-material/LocationPin";

export const ShortestRoutegram = ({ shortestRoute }) => {
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
          <LocationPinIcon
            sx={{
              p: "10px",
              boxSizing: "content-box",
              fontSize: "40px",
              borderRadius: "8px",
              backgroundColor: "#facc1522",
              color: "#facc15",
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
            Rutagrama mas corto
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
              {(shortestRoute?.distance / 1000).toFixed(2)}
            </Typography>
            <Box component="span" sx={{ color: "white" }}>
              kilómetros
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
