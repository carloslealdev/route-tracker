import { useState } from "react";
import {
  MapContainer,
  Polyline,
  TileLayer,
  GeoJSON,
  Popup,
  Marker,
} from "react-leaflet";
import Swal from "sweetalert2";

// Asumimos que unificamos los componentes de centrado en uno genérico
// import { GenericMapCenter } from "../../components/GenericMapCenter";
import { NoRoutegramAvailable } from "./NoRoutegramAvailable";
import { CenterMap } from "./CenterMap";

const DEFAULT_CENTER = [10.4806, -66.9036];
const INITIAL_ZOOM = 17;

export const RoutegramMapCard = ({ routeData, type, onUpdate, onDelete }) => {
  const [initialPoint, setInitialPoint] = useState(DEFAULT_CENTER);

  // TODO: Eliminar si ya no usas el dibujo manual
  //   const [draftRoute, setDraftRoute] = useState([]);
  const [route, setRoute] = useState([]);

  const handleDeleteClick = () => {
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
        // Ejecutamos la función que viene del padre pasando el ID
        onDelete(routeData._id);
      }
    });
  };

  const handleUpdateClick = () => {
    // Ejecutamos la función del padre pasando el tipo
    onUpdate(type);
  };

  return (
    <div className="map-card">
      <h1>Ruta {type}</h1>
      <span>Última actualización: {new Date().toISOString()}</span>

      {routeData ? (
        <div className="map-container">
          <MapContainer
            center={initialPoint}
            zoom={INITIAL_ZOOM}
            scrollWheelZoom={true}
            style={{ flex: 1, width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Componente de centrado reutilizable */}
            <CenterMap setCenter={setInitialPoint} routeData={routeData} />

            {route.length > 0 && <Polyline positions={route} color="red" />}

            {/* Renderizamos el GeoJSON que viene por props */}
            <GeoJSON
              key={routeData._id} // Importante: fuerza al mapa a repintar si cambia la ruta
              data={routeData.location}
              style={{ color: "blue", weight: 5 }}
            />

            <Marker position={initialPoint}>
              <Popup>Current Position</Popup>
            </Marker>
          </MapContainer>

          <div className="actions-map-buttons-container">
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleUpdateClick}>Update</button>
          </div>
        </div>
      ) : (
        <NoRoutegramAvailable typeRoutegram={type} />
      )}
    </div>
  );
};
