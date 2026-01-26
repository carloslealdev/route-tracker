import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import { CenterMapOnPosition } from "../../components/CenterMapOnPosition";
import { HandleClick } from "../../components/HandleClick";
import { useState } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { useUiStore } from "../../hooks/useUiStore";

const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_CENTER);

  const { draftPoints, activeRoute } = useRoutegramStore();
  const { typeRoutegramToEdit, isUpdating } = useUiStore();
  return (
    <div className="map-card">
      <h1>Nuevo Rutagrama {typeRoutegramToEdit}</h1>
      {console.log(typeRoutegramToEdit)}
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
        {/* <HandleClick route={route} setRoute={setRoute} /> */}
        <HandleClick draftPoints={draftPoints} />

        {/* Centrar mapa en la ubicacion actual */}
        <CenterMapOnPosition setCurrentPosition={setCurrentPosition} />
        {draftPoints.length > 0 && (
          <Polyline positions={draftPoints} color="red" />
        )}

        {isUpdating && (
          <GeoJSON
            data={activeRoute.location}
            style={{ color: "blue", weight: 5 }}
          />
        )}

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
