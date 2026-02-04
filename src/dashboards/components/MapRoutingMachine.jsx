import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { RoutingMachine } from "./RoutingMachine"; // El archivo que creamos arriba
import { Button, Box, Typography } from "@mui/material";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { useUiStore } from "../../hooks/useUiStore";
import { GeoJSON } from "react-leaflet";

// Helper para capturar clicks en el mapa
const MapClicker = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e.latlng),
  });
  return null;
};

export const MapRoutingMachine = () => {
  const { activeRoute, startSavingRoutegram, startUpdatingRoutegram } =
    useRoutegramStore();
  const { typeRoutegramToEdit, closeRoutegramModal, isUpdating } = useUiStore();

  // Estado para los puntos A y B
  const [points, setPoints] = useState({ start: null, end: null });

  // Estado donde guardaremos la ruta final calculada
  const [routeResult, setRouteResult] = useState(null);

  const handleMapClick = (latlng) => {
    if (!points.start) {
      setPoints({ ...points, start: latlng });
    } else if (!points.end) {
      setPoints({ ...points, end: latlng });
    } else {
      // Opcional: Reiniciar si ya hay dos puntos y hace click de nuevo
      // setPoints({ start: latlng, end: null });
      alert("Arrastra la línea azul para modificar la ruta o presiona Reset.");
    }
  };

  const handleSaveRoute = () => {
    if (!routeResult) return;
    //todo: Implementar el tiempo de ruta
    //todo: Implementar el tiempo de llegada estimado

    // AQUÍ CONSTRUYES TU OBJETO PARA EL BACKEND
    // const newRoutegram = {
    //   location: {
    //     type: "LineString",
    //     coordinates: routeResult.coordinates, // Ya viene en formato [Lng, Lat]
    //   },
    //   distance: routeResult,
    //   //   distance: routeResult.summary.totalDistance, // en metros
    //   // ... otros campos (nombre, usuario, etc)
    // };
    const dataToSave = {
      type: "LineString",
      typeRoute: typeRoutegramToEdit,
      coordinates: routeResult.coordinates,
      distance: routeResult.summary.totalDistance,
      travelTime: routeResult.summary.totalTime,
    };

    if (activeRoute && activeRoute._id) {
      startUpdatingRoutegram(activeRoute._id, dataToSave);
    } else {
      startSavingRoutegram(dataToSave);
    }

    // console.log("Enviando a Mongo:", newRoutegram);
    console.log("Enviando a Mongo:", dataToSave);
    // dispatch( startCreatingRoutegram(newRoutegram) );
    closeRoutegramModal();
  };

  const resetMap = () => {
    setPoints({ start: null, end: null });
    setRouteResult(null);
  };

  return (
    <Box
      height="80vh"
      width="80vw"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {/* Panel de Instrucciones / Control */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="#f5f5f5"
      >
        <Typography variant="h6">
          {!points.start
            ? "Click en el mapa para el INICIO (A)"
            : !points.end
              ? "Click en el mapa para el FINAL (B)"
              : "¡Arrastra la línea para ajustar la ruta!"}
        </Typography>

        <Box gap={2} display="flex">
          <Button variant="outlined" color="error" onClick={resetMap}>
            Resetear
          </Button>
          <Button
            variant="contained"
            disabled={!routeResult} // Solo activa si la ruta se calculó
            onClick={handleSaveRoute}
          >
            Guardar Rutagrama
          </Button>
        </Box>
      </Box>

      {/* Mapa */}
      <MapContainer center={[10.199, -67.47]} zoom={13} style={{ flex: 1 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Componente para detectar clicks */}
        <MapClicker onMapClick={handleMapClick} />

        {/* Componente de Routing: Solo se activa cuando tenemos A y B */}
        {points.start && points.end && (
          <RoutingMachine
            startPoint={points.start}
            endPoint={points.end}
            setRouteInfo={setRouteResult}
          />
        )}
        {isUpdating && (
          <GeoJSON data={activeRoute.location} style={{ color: "blue" }} />
        )}
      </MapContainer>
    </Box>
  );
};
