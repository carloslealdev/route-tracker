import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Chip, Stack } from "@mui/material";

export const WorkerCard = ({ name, identityCard, routes = [] }) => {
  // Verificamos la existencia de cada tipo de ruta en el array que ahora viene del backend
  const hasCasaTrabajo = routes.some((r) => r.typeRoute === "Casa-Trabajo");
  const hasTrabajoCasa = routes.some((r) => r.typeRoute === "Trabajo-Casa");
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#32373d",
        color: "white",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <LocationOnIcon />
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Cédula: V - ${identityCard}`}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Casa-Trabajo"
              size="small"
              color={hasCasaTrabajo ? "primary" : "default"}
            />
            <Chip
              label="Trabajo-Casa"
              size="small"
              color={hasTrabajoCasa ? "primary" : "default"}
            />
          </Stack>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
