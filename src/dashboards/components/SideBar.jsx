import React, { useState } from "react";

import {
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

export const SideBar = () => {
  const [filtersSelected, setFiltersSelected] = useState({
    active: false,
    withRoutegramCT: false,
    withRoutegramTC: false,
  });

  const handleFilterClick = (filter) => {
    setFiltersSelected((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          width: "350px",
          backgroundColor: "#1a2129",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#25272cff",
            width: "300px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
              mb: "20px",
            }}
          >
            Gestión de Trabajadores
          </Typography>
          <TextField
            label="Buscar por Nombre o Cédula"
            variant="outlined"
            sx={{ mb: "20px", backgroundColor: "#32373d", width: "100%" }}
          />

          <Typography gutterBottom variant="body2">
            Filtros
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip
              color={filtersSelected.active ? "primary" : "default"}
              label="Activo"
              size="small"
              clickable
              onClick={() => handleFilterClick("active")}
            />
            <Chip
              color={filtersSelected.withRoutegramCT ? "primary" : "default"}
              label="Con rutagrama CT"
              size="small"
              clickable
              onClick={() => handleFilterClick("withRoutegramCT")}
            />
            <Chip
              color={filtersSelected.withRoutegramTC ? "primary" : "default"}
              label="Con rutagrama TC"
              size="small"
              clickable
              onClick={() => handleFilterClick("withRoutegramTC")}
            />
          </Stack>
        </Box>
        <Divider sx={{ width: "100%", my: "20px", backgroundColor: "gray" }} />
      </Box>
    </>
  );
};
