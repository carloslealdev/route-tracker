import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "../components/Header";
import { useAdminStore } from "../../hooks/useAdminStore";
import { MapScenesRoutegrams } from "../components/MapScenesRoutegrams";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { ListCardsRoutegramsScene } from "../components/ListCardsRoutegramsScene";

export const Routegrams = () => {
  const { routegrams, isLoading, startLoadingRoutegrams } = useAdminStore();
  const { setActiveRoutegramScene, activeRouteScene } = useRoutegramStore();

  useEffect(() => {
    startLoadingRoutegrams();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box
      sx={{
        height: "100%", // Fill parent
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        title="Rutagramas"
        subtitle="Visualización y gestión de rutagramas"
      />

      <Box
        display="flex"
        flexDirection="row"
        gap={2}
        sx={{ flex: 1, minHeight: 0 }}
      >
        <Box
          sx={{
            flex: 1, // Share space, or use fixed width if desired
            display: "flex", // Habilita flexbox
            flexDirection: "column", // Organiza elementos verticalmente
            minHeight: 0, // Allow scrolling
          }}
        >
          <ListCardsRoutegramsScene
            routegrams={routegrams}
            setActiveRoutegramScene={setActiveRoutegramScene}
            activeRouteScene={activeRouteScene}
          />
        </Box>
        <Box
          sx={{
            width: "60%",
            flexGrow: 1,
            // overflow: "auto", // Map usually handles its own zoom/pan, but keep if needed
            p: 2,
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MapScenesRoutegrams />
        </Box>
      </Box>
    </Box>
  );
};
