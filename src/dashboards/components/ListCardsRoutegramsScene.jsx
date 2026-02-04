import {
  List,
  ListItem,
  ListItemButton,
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Person from "@mui/icons-material/Person";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export const ListCardsRoutegramsScene = ({
  routegrams,
  setActiveRoutegramScene,
  activeRouteScene,
}) => {
  return (
    <>
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
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <LocationOnIcon />
                      <Typography variant="span">{`Rutagrama - ${routegram._id}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Person color="primary" />
                      <Typography variant="h5">
                        {`${routegram.workerId.firstName} ${routegram.workerId.lastName}`}
                      </Typography>
                    </Box>
                    <Chip
                      sx={{
                        width: "100%",
                      }}
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
                      <Box display={"flex"} alignItems={"center"} gap={"2px"}>
                        {/* <Person color="primary" /> */}
                        <Typography variant="span">
                          {routegram.workerId.role}
                        </Typography>
                      </Box>

                      <Tooltip title="Tiempo de viaje">
                        <Box display={"flex"} alignItems={"center"} gap={"2px"}>
                          <AccessTimeFilledIcon sx={{ color: "#ffc400ff" }} />
                          <Typography variant="span">
                            TDV: {(routegram.travelTime / 60).toFixed(2)} min
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
