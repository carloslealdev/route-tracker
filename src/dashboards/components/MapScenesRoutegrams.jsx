import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import { CenterMapOnPosition } from "../../components/CenterMapOnPosition";
import { useState } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { Box } from "@mui/material";

const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const MapScenesRoutegrams = () => {
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_CENTER);

  const { activeRouteScene } = useRoutegramStore();

  return (
    // <div className="map-card">
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MapContainer
        center={currentPosition}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom={true}
        style={{ flex: 1, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Centrar mapa en la ubicacion actual */}
        <CenterMapOnPosition setCurrentPosition={setCurrentPosition} />

        {/* {activeRouteScene && ( */}
        {activeRouteScene && (
          <GeoJSON
            key={activeRouteScene._id}
            data={activeRouteScene.location}
            style={{ color: "blue", weight: 5 }}
          />
          // <Polyline
          //   positions={activeRouteScene.location.coordinates.map((coord) => [
          //     coord[1],
          //     coord[0],
          //   ])}
          //   color="red"
          //   weight={5}
          // />
        )}

        <Marker position={currentPosition}>
          <Popup>
            {/* A pretty CSS3 popup. <br /> Easily customizable. */}
            Current Position
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
    // </div>
  );
};
