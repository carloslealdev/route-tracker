import { useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

import { HandleClick } from "../../components/HandleClick";
import { CenterMapOnPosition } from "../../components/CenterMapOnPosition";
import { useAuthStore } from "../../hooks/useAuthStore";
// --- 1. CONFIGURACIÓN INICIAL Y FALLBACK ---
const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const DashboardWorker = () => {
  const { startLogin } = useAuthStore();
  const testUser = {
    identityCard: "24172438",
    password: "123456",
  };

  const [route, setRoute] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_CENTER);

  const handleUndoLastLine = () => {
    setRoute((prevRoute) => prevRoute.slice(0, -1));
  };

  const handleSaveRoute = () => {
    const dataToSave = {
      user: "Carlos",
      date: new Date().toISOString(),
      routegram: route,
    };

    console.log(dataToSave);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        width: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={handleUndoLastLine}>Undo Last Line</button>
        <button onClick={handleSaveRoute}>Save Route</button>
        <button onClick={() => startLogin(testUser)}>Login</button>
      </div>
      <MapContainer
        center={currentPosition}
        // center={[10.18625, -67.46291]}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom={true}
        style={{ flex: 1, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Logica para capturar clicks */}
        <HandleClick route={route} setRoute={setRoute} />

        {/* Centrar mapa en la ubicacion actual */}
        <CenterMapOnPosition setCurrentPosition={setCurrentPosition} />

        {route.length > 1 && <Polyline positions={route} color="red" />}

        <Marker position={currentPosition}>
          <Popup>
            {/* A pretty CSS3 popup. <br /> Easily customizable. */}
            Current Position
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
