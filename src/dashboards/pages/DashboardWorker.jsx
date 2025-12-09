import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  GeoJSON,
} from "react-leaflet";

import { HandleClick } from "../../components/HandleClick";
import { CenterMapOnPosition } from "../../components/CenterMapOnPosition";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { CenterMapCasaTrabajo } from "../../components/CenterMapCasaTrabajo";
import { CenterMapTrabajoCasa } from "../../components/CenterMapTrabajoCasa";
// --- 1. CONFIGURACIÓN INICIAL Y FALLBACK ---
const DEFAULT_CENTER = [10.4806, -66.9036]; // Caracas, o una ubicación central conocida
const INITIAL_ZOOM = 17;

export const DashboardWorker = () => {
  const { startLogin } = useAuthStore();

  const testUser = {
    identityCard: "23423633",
    password: "123456",
  };

  const { loadedRoutes } = useRoutegramStore();

  const myRouteCasaTrabajo =
    loadedRoutes.length > 0 ? loadedRoutes[0].location : null;
  const myRouteTrabajoCasa =
    loadedRoutes.length > 0 ? loadedRoutes[1].location : null;

  const [initialPointCasaTrabajo, setInitialPointCasaTrabajo] =
    useState(DEFAULT_CENTER);
  const [initialPointTrabajoCasa, setInitialPointTrabajoCasa] =
    useState(DEFAULT_CENTER);

  //TODO ELIMINAR ese state y manejar las lineas de dibujo con la propiedad draftPoint del routegramSlice
  const [route, setRoute] = useState([]);

  //Función para invertir el orden en el que se guardan las coordenadas, porque guarda coords como [lng, lat], pero Leaflet usa [lat, lng]
  const reverseCoordinates = (route = []) => {
    const newCoordinates = [];
    route.forEach((element) => {
      const [a, b] = element;
      const reversedElement = [b, a];
      newCoordinates.push(reversedElement);
    });
    return newCoordinates;
  };

  const handleUndoLastLine = () => {
    setRoute((prevRoute) => prevRoute.slice(0, -1));
  };

  const handleSaveRoute = () => {
    const dataToSave = {
      user: "Carlos",
      date: new Date().toISOString(),
      routegram: reverseCoordinates(route),
    };

    console.log(dataToSave);
  };

  return (
    <>
      <header className="nav-bar">
        <div className="nav-bar-container">
          <h2>RoutegramApp</h2>
          <div className="nav-bar-info">
            <h3>My Name</h3>
            <button className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <section className="body-container">
        <div className="maps-container">
          {/* MAPA CASA - TRABAJO */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "500px",
              width: "500px",
            }}
          >
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

              <Marker position={initialPointCasaTrabajo}>
                <Popup>
                  {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                  Current Position
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* MAPA TRABAJO - CASA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "500px",
              width: "500px",
            }}
          >
            <MapContainer
              center={initialPointTrabajoCasa}
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
              <CenterMapTrabajoCasa
                setInitialPointTrabajoCasa={setInitialPointTrabajoCasa}
              />
              {route.length > 0 && <Polyline positions={route} color="red" />}

              {myRouteTrabajoCasa && (
                <GeoJSON
                  data={myRouteTrabajoCasa}
                  style={{ color: "blue", weight: 5 }}
                />
              )}

              <Marker position={initialPointTrabajoCasa}>
                <Popup>
                  {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                  Current Position
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      <footer>
        <div className="actions-container">
          <button className="btn-action" onClick={handleUndoLastLine}>
            Undo Last Line
          </button>
          <button className="btn-action" onClick={handleSaveRoute}>
            Save Route
          </button>
          <button className="btn-action" onClick={() => startLogin(testUser)}>
            Login
          </button>
          <button
            className="btn-action"
            onClick={() => startLoadingMyRoutegrams()}
          >
            My Routegrams
          </button>
        </div>
      </footer>
    </>
  );
};
