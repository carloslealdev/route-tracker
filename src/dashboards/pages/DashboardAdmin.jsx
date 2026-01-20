// import React, { useEffect } from "react";
// import { SideBar } from "../components/SideBar";
// import { NavBar } from "../components/NavBar";
// import { useAdminStore } from "../../hooks/useAdminStore";

// export const DashboardAdmin = () => {
//   const { startLoadingUsers, isLoading } = useAdminStore();

//   useEffect(() => {
//     startLoadingUsers();
//   }, []);

//   if (isLoading) return <h1>Loading...</h1>;

//   return (
//     <>
//       <NavBar />
//       <SideBar />
//     </>
//   );
// };

import * as React from "react";
import Box from "@mui/material/Box";

import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { indicatorsData } from "../../fixtures/indicatorsData";
import { IndicatorDashboard } from "../components/IndicatorDashboard";
import { styled } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { Routegrams } from "../scenes/Routegrams";
import { Employees } from "../scenes/Employees";
import { Vehicles } from "../scenes/Vehicles";
import { Dashboard } from "../scenes/Dashboard";
import { Help } from "../scenes/Help";
import { Settings } from "../scenes/Settings";
import { Register } from "../scenes/Register";

const drawerWidth = 240;

//todo DrawerHeader Es necesario para que el contenido se muestre debajo de la barra de navegación
//todo: Deberia ser un componente reutilizable
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const DashboardAdmin = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#1c1e26",
        }}
      >
        <DrawerHeader />
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* <Box
            sx={{
              width: "360px",
              display: "flex",
              flexDirection: "column",
              // flexWrap: "nowrap",
              gap: "20px",
            }}
          >
            {indicatorsData.map((indicator) => (
              <IndicatorDashboard
                key={indicator.title}
                title={indicator.title}
                subtitle={indicator.subtitle}
                value={indicator.value}
                // icon={indicator.icon}
              />
            ))}
          </Box> */}
          <Box
            sx={{
              width: "100%",
              height: `calc(100dvh - 118px)`,
              backgroundColor: "#1c1e26",
            }}
          >
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rutagramas" element={<Routegrams />} />
              <Route path="empleados" element={<Employees />} />
              <Route path="registro" element={<Register />} />
              <Route path="vehiculos" element={<Vehicles />} />
              <Route path="configuracion" element={<Settings />} />
              <Route path="ayuda" element={<Help />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
