import React from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { Button, Typography } from "@mui/material";

export const NoRoutegramAvailable = ({ typeRoutegram }) => {
  const { openRoutegramModal } = useUiStore();

  const handleClick = () => {
    openRoutegramModal(typeRoutegram);
  };
  return (
    <>
      <div className="no-map-available-container">
        <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
          No posee un Rutagrama de este tipo
        </Typography>

        <Button variant="contained" color="primary" onClick={handleClick}>
          Crear Rutagrama
        </Button>
      </div>
    </>
  );
};
