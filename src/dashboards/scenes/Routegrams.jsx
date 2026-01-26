import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Header } from "../components/Header";
import { useAdminStore } from "../../hooks/useAdminStore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Person } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { MapScenesRoutegrams } from "../components/MapScenesRoutegrams";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { ListItemButton } from "@mui/material";

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
          <List
            sx={{
              width: "100%",
              flexGrow: 1, // Ocupa todo el espacio vertical disponible
              overflow: "auto", // Habilita el SCROLL solo en este elemento
              p: 2, // Padding interno
            }}
          >
            {routegrams.map((routegram) => (
              <ListItem key={routegram._id} disablePadding sx={{ mb: "10px" }}>
                <ListItemButton
                  onClick={() => setActiveRoutegramScene(routegram)}
                  selected={activeRouteScene?._id === routegram._id}
                  sx={{
                    "&.Mui-selected": {
                      // backgroundColor: "#42474e",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: "10px",
                      backgroundColor: "#32373d",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#42474e",
                        transform: "translateY(-5px)",
                      },
                      "&:active": {
                        transform: "translateY(2px)",
                      },
                    }}
                    // key={routegram._id}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <LocationOnIcon />
                      <Box>
                        <Typography variant="span">{`Rutagrama - ${routegram._id}`}</Typography>
                        <Typography variant="h5">
                          {`${routegram.workerId.firstName} ${routegram.workerId.lastName}`}
                        </Typography>
                        <Chip
                          label={routegram.typeRoute}
                          size="small"
                          color={
                            routegram.typeRoute === "Casa-Trabajo"
                              ? "primary"
                              : "secondary"
                          }
                        />
                        <Divider sx={{ mt: "10px" }} />
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          py={"5px"}
                        >
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"2px"}
                          >
                            <Person />
                            <Typography variant="span">
                              {routegram.workerId.role}
                            </Typography>
                          </Box>

                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={"2px"}
                          >
                            <AccessTimeIcon />
                            <Typography variant="span">
                              Tiempo de viaje
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
