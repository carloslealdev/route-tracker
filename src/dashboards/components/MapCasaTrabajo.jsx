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

const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const MapCasaTrabajo = () => {
  const typeRoutegram = "Casa-Trabajo";
  const [initialPointCasaTrabajo, setInitialPointCasaTrabajo] =
    useState(DEFAULT_CENTER);

  const { loadedRoutes } = useRoutegramStore();

  const myRouteCasaTrabajo =
    loadedRoutes.length > 0 ? loadedRoutes[0].location : null;

  //TODO ELIMINAR ese state y manejar las lineas de dibujo con la propiedad draftPoint del routegramSlice
  const [route, setRoute] = useState([]);

  return (
    <>
      {/* MAPA CASA - TRABAJO */}
      <div className="map-card">
        <h1>Ruta {typeRoutegram}</h1>
        <span>Ultima fecha de actualizacion: {new Date().toISOString()}</span>
        {loadedRoutes.length > 0 &&
        (loadedRoutes[0].typeRoute === "Casa-Trabajo" ||
          loadedRoutes[1].typeRoute === "Casa-Trabajo") ? (
          <MapContainer
            center={initialPointCasaTrabajo}
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
            {/* <CenterMapOnPosition setCurrentPosition={setCurrentPosition} /> */}
            <CenterMapCasaTrabajo
              setInitialPointCasaTrabajo={setInitialPointCasaTrabajo}
            />
            {route.length > 0 && <Polyline positions={route} color="red" />}

            {myRouteCasaTrabajo && (
              <GeoJSON
                data={myRouteCasaTrabajo}
                style={{ color: "blue", weight: 5 }}
              />
            )}

            {/* {myRouteCasaTrabajo ? (
                      <GeoJSON
                        data={myRouteCasaTrabajo}
                        style={{ color: "blue", weight: 5 }}
                      />
                    ) : null} */}

            <Marker position={initialPointCasaTrabajo}>
              <Popup>
                {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                Current Position
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <NoRoutegramAvailable typeRoutegram={typeRoutegram} />
        )}
      </div>
    </>
  );
};
