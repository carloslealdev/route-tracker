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

const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const MapCasaTrabajo = () => {
  const typeRoutegram = "Casa-Trabajo";
  const [initialPointCasaTrabajo, setInitialPointCasaTrabajo] =
    useState(DEFAULT_CENTER);

  const { loadedRoutes, setActiveRoutegram, routeCasaTrabajo } =
    useRoutegramStore();
  const { startUpdatingRoutegram } = useUiStore();

  //TODO ELIMINAR ese state y manejar las lineas de dibujo con la propiedad draftPoint del routegramSlice
  const [route, setRoute] = useState([]);

  const handleUpdate = () => {
    setActiveRoutegram(typeRoutegram);

    startUpdatingRoutegram(typeRoutegram);
  };

  return (
    <>
      {/* MAPA CASA - TRABAJO */}
      <div className="map-card">
        <h1>Ruta {typeRoutegram}</h1>
        <span>Ultima fecha de actualizacion: {new Date().toISOString()}</span>
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
              <HandleClick route={route} setRoute={setRoute} />

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
              <button>Delete</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        ) : (
          <NoRoutegramAvailable typeRoutegram={typeRoutegram} />
        )}
      </div>
    </>
  );
};
