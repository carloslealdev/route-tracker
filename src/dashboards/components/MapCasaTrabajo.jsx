import { useState } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import {
  MapContainer,
  Polyline,
  TileLayer,
  GeoJSON,
  Popup,
  Marker,
} from "react-leaflet";
import { HandleClick } from "../../components/HandleClick";
import { CenterMapCasaTrabajo } from "../../components/CenterMapCasaTrabajo";
import { NoRoutegramAvailable } from "./NoRoutegramAvailable";
import { useUiStore } from "../../hooks/useUiStore";
import Swal from "sweetalert2";
import { Box, Button, Typography } from "@mui/material";

const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const MapCasaTrabajo = () => {
  const typeRoutegram = "Casa-Trabajo";
  const [initialPointCasaTrabajo, setInitialPointCasaTrabajo] =
    useState(DEFAULT_CENTER);

  const {
    loadedRoutes,
    setActiveRoutegram,
    routeCasaTrabajo,
    startDeletingRoutegram,
  } = useRoutegramStore();
  const { startUpdatingRoutegram } = useUiStore();

  //TODO ELIMINAR ese state y manejar las lineas de dibujo con la propiedad draftPoint del routegramSlice
  const [route, setRoute] = useState([]);

  const handleUpdate = () => {
    setActiveRoutegram(typeRoutegram);

    startUpdatingRoutegram(typeRoutegram);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Quieres eliminar este rutagrama?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar rutagrama",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingRoutegram(routeCasaTrabajo._id);
      }
    });
  };

  return (
    <>
      {/* MAPA CASA - TRABAJO */}
      <Box
        className="map-card"
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "700px",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              Ruta {typeRoutegram}
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                DISTANCIA TOTAL:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#1976d2",
                  fontWeight: "bold",
                  // textAlign: "left",
                  fontSize: "24px",
                }}
              >
                {(routeCasaTrabajo?.distance / 1000).toFixed(2)} km
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              TIEMPO DE VIAJE:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                textAlign: "right",
                fontSize: "32px",
              }}
            >
              {(routeCasaTrabajo?.travelTime / 60).toFixed(2)} min
            </Typography>
          </Box>
        </Box>
        {/* <span>Ultima fecha de actualizacion: {new Date().toISOString()}</span> */}
        {routeCasaTrabajo ? (
          <div className="map-container">
            <MapContainer
              center={initialPointCasaTrabajo}
              zoom={INITIAL_ZOOM}
              scrollWheelZoom={true}
              style={{ flex: 1, width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Logica para capturar clicks */}
              {/* <HandleClick route={route} setRoute={setRoute} /> */}

              {/* Centrar mapa en la ubicacion actual */}
              <CenterMapCasaTrabajo
                setInitialPointCasaTrabajo={setInitialPointCasaTrabajo}
              />
              {route.length > 0 && <Polyline positions={route} color="red" />}

              <GeoJSON
                data={routeCasaTrabajo.location}
                style={{ color: "blue", weight: 5 }}
              />

              <Marker position={initialPointCasaTrabajo}>
                <Popup>
                  {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                  Current Position
                </Popup>
              </Marker>
            </MapContainer>
            <div className="actions-map-buttons-container">
              <Button variant="contained" color="error" onClick={handleDelete}>
                Eliminar
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Actualizar
              </Button>
            </div>
          </div>
        ) : (
          <NoRoutegramAvailable typeRoutegram={typeRoutegram} />
        )}
      </Box>
    </>
  );
};
