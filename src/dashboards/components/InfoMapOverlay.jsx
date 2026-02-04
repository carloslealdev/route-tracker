import { Box, Typography } from "@mui/material";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

export const InfoMapOverlay = () => {
  const { activeRouteScene } = useRoutegramStore();

  if (!activeRouteScene) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "50px",
        left: "50px",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "20px",
        borderRadius: "20px",
        width: "calc(100% - 100px)",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography variant="body1" color="gray">
          Nombre Completo:
        </Typography>
        <Typography variant="body2" color="white">
          {activeRouteScene?.workerId.firstName}{" "}
          {activeRouteScene?.workerId.lastName}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="gray">
          Cédula de Identidad:
        </Typography>
        <Typography variant="body2" color="white">
          {activeRouteScene?.workerId.identityCard}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="gray">
          Distancia de ruta:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "#00e5ff",
            fontSize: "32px",
          }}
        >
          {(activeRouteScene?.distance / 1000).toFixed(2)} km
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" color="gray">
          Tiempo estimado de viaje:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "#ff9800",
            fontSize: "32px",
          }}
        >
          {(activeRouteScene?.travelTime / 60).toFixed(2)} min
        </Typography>
      </Box>
    </Box>
  );
};
