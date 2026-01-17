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
        <Box
          className="AQUII"
          sx={{ display: "flex", width: "100%", gap: "20px" }}
        >
          <Box
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
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "red",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
