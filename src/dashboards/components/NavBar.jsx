import { Avatar, Box, CssBaseline, Divider, TextField } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { useAuthStore } from "../../hooks/useAuthStore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#16181d",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        backgroundColor: "#16181d",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const NavBar = ({ open, setOpen }) => {
  const { user, startLogout } = useAuthStore();
  const { resetLoadedRoutegrams } = useRoutegramStore();

  const theme = useTheme();

  const handleLogout = () => {
    startLogout();
    resetLoadedRoutegrams();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            disabled={user.role === "Worker"}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                Route Tracker App
              </Typography>

              <TextField
                // label="Buscar por Nombre o Cédula"
                variant="standard"
                placeholder="Buscar Empleado, Rutagrama o Vehiculo..."
                sx={{
                  backgroundColor: "#32373d",
                  width: "360px",
                  borderRadius: "20px",
                  paddingLeft: "10px",
                  "& .MuiInput-root": {
                    "&:before": {
                      borderBottom: "none", // Elimina la línea gris (reposo)
                    },
                    "&:after": {
                      borderBottom: "none", // Elimina la línea azul (focus)
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none", // Elimina la línea al pasar el mouse
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Divider
                orientation="vertical"
                sx={{ backgroundColor: "#94a3b8" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">{user.name}</Typography>
                <Typography variant="body2">{user.role}</Typography>
              </Box>
              <Avatar alt="Carlos Leal"></Avatar>
              {user.role === "Worker" && (
                <IconButton>
                  <LogoutIcon color="error" onClick={handleLogout} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
