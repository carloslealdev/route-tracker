// import React, { useState } from "react";

// import {
//   Box,
//   Chip,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useAdminStore } from "../../hooks/useAdminStore";
// import { WorkerCard } from "./WorkerCard";

// export const SideBar = () => {
//   const { users, isLoading, activeUser } = useAdminStore();

//   const [filtersSelected, setFiltersSelected] = useState({
//     active: false,
//     withRoutegramCT: false,
//     withRoutegramTC: false,
//   });

//   const handleFilterClick = (filter) => {
//     setFiltersSelected((prev) => ({
//       ...prev,
//       [filter]: !prev[filter],
//     }));
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           height: "calc(100vh - 64px)",
//           width: "350px",
//           backgroundColor: "#1a2129",
//           padding: "20px",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "#25272cff",
//             width: "300px",
//             padding: "20px",
//             borderRadius: "10px",
//           }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               textAlign: "center",
//               fontSize: "20px",
//               fontWeight: "bold",
//               color: "white",
//               mb: "20px",
//             }}
//           >
//             Gestión de Trabajadores
//           </Typography>
//           <TextField
//             label="Buscar por Nombre o Cédula"
//             variant="outlined"
//             sx={{ mb: "20px", backgroundColor: "#32373d", width: "100%" }}
//           />

//           <Typography gutterBottom variant="body2">
//             Filtros
//           </Typography>
//           <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//             <Chip
//               color={filtersSelected.active ? "primary" : "default"}
//               label="Activo"
//               size="small"
//               clickable
//               onClick={() => handleFilterClick("active")}
//             />
//             <Chip
//               color={filtersSelected.withRoutegramCT ? "primary" : "default"}
//               label="Con rutagrama CT"
//               size="small"
//               clickable
//               onClick={() => handleFilterClick("withRoutegramCT")}
//             />
//             <Chip
//               color={filtersSelected.withRoutegramTC ? "primary" : "default"}
//               label="Con rutagrama TC"
//               size="small"
//               clickable
//               onClick={() => handleFilterClick("withRoutegramTC")}
//             />
//           </Stack>
//         </Box>
//         <Divider sx={{ width: "100%", my: "20px", backgroundColor: "gray" }} />

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             backgroundColor: "#25272cff",
//             width: "300px",
//             padding: "20px",
//             borderRadius: "10px",
//             gap: "8px",
//           }}
//         >
//           {users.map((user) => (
//             <WorkerCard
//               key={user._id}
//               name={user.name}
//               identityCard={user.identityCard}
//               routes={user.routegrams}
//             />
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// };
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Divider, IconButton } from "@mui/material";
import { SideBarListOptions } from "./SideBarListOptions";
import { SideBarListSections } from "./SideBarListSections";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          backgroundColor: "#1c1e26",
          color: "#94a3b8",
          ...openedMixin(theme),
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          backgroundColor: "#1c1e26",
          color: "#94a3b8",
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

export const SideBar = ({ open, setOpen }) => {
  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#94a3b8" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#94a3b8" }} />
        <SideBarListSections open={open} />

        <Divider sx={{ backgroundColor: "#94a3b8" }} />
        <SideBarListOptions open={open} />
      </Drawer>
    </>
  );
};
