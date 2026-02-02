import { NavBar } from "../components/NavBar";
import { MapCasaTrabajo } from "../components/MapCasaTrabajo";
import { MapTrabajoCasa } from "../components/MapTrabajoCasa";
import { RoutegramModal } from "../components/RoutegramModal";
import { useEffect, useState } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { SideBar } from "../components/SideBar";
import { Box, Typography } from "@mui/material";
import { Header } from "../components/Header";
import { DrawerHeader } from "./DashboardAdmin";
import { Person, PersonPinCircleRounded } from "@mui/icons-material";
import { useAuthStore } from "../../hooks/useAuthStore";

export const DashboardWorker = () => {
  const { user } = useAuthStore();
  const { startLoadingMyRoutegrams } = useRoutegramStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <NavBar />
        {/* <SideBar open={open} setOpen={setOpen} /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1c1e26",
            overflow: "hidden", // Prevent main scroll
          }}
        >
          <DrawerHeader />
          <Box
            sx={{
              // mt: 2,
              flexGrow: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Box
              sx={{
                // mt: 2,
                flex: 1,
                width: "100%",
                minHeight: 0,
                backgroundColor: "#1c1e26",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // Ensure no scroll escapes this
              }}
            >
              <Header
                title="Gestión de Rutagramas del Trabajador"
                subtitle="Visualización de rutagramas e información del perfil"
              />

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <MapCasaTrabajo />
                <MapTrabajoCasa />
              </Box>

              <Box
                sx={{
                  mt: 2,
                  padding: 2,
                  // flex: 1,
                  backgroundColor: "#16181d",
                  mx: "auto",
                  width: "100%",
                  height: "130px",
                  borderRadius: "20px",
                  // overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#2b2d33ff",
                    borderRadius: "20px",
                    padding: 1,
                  }}
                >
                  <Person color="primary" />
                  <Typography variant="h6" color="white">
                    Información del Perfil:
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body1" color="gray">
                      Nombre Completo:
                    </Typography>
                    <Typography variant="body2" color="white">
                      {user.name} {user.lastName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" color="gray">
                      Cédula de Identidad:
                    </Typography>
                    <Typography variant="body2" color="white">
                      {user.identityCard}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" color="gray">
                      Teléfono:
                    </Typography>
                    <Typography variant="body2" color="white">
                      {user.phone}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" color="gray">
                      Departamento:
                    </Typography>
                    <Typography variant="body2" color="white">
                      Mtto Eléctrico
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <RoutegramModal />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
