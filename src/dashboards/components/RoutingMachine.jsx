import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

// Iconos personalizados para A y B (opcional, pero se ve mejor)
// Puedes usar los default de Leaflet si prefieres no complicarte ahora.
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

export const RoutingMachine = ({ startPoint, endPoint, setRouteInfo }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Si no tenemos ambos puntos, no calculamos ruta aún
    if (!startPoint || !endPoint) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint.lat, startPoint.lng),
        L.latLng(endPoint.lat, endPoint.lng),
      ],
      routeWhileDragging: true, // ¡Vital! Permite el efecto Drag & Drop fluido
      showAlternatives: false, // Solo queremos una ruta principal
      fitSelectedRoutes: true, // Hace zoom para ver toda la ruta
      lineOptions: {
        styles: [{ color: "#008307", weight: 6, opacity: 0.8 }], // Verde corporativo
      },
      // Personalización de marcadores
      createMarker: function (i, wp, nWps) {
        if (i === 0)
          return L.marker(wp.latLng, {
            icon: createIcon("green"),
            draggable: true,
          });
        if (i === nWps - 1)
          return L.marker(wp.latLng, {
            icon: createIcon("red"),
            draggable: true,
          });
        // Puntos intermedios (creados al arrastrar)
        return L.marker(wp.latLng, {
          icon: createIcon("blue"),
          draggable: true,
        });
      },
      // Ocultamos el cuadro de instrucciones (texto) para limpiar la interfaz
      containerClassName: "routing-hidden-container",
      addWaypoints: true,
      draggableWaypoints: true,
    }).addTo(map);

    // ESCUCHAMOS CUANDO LA RUTA CAMBIA O SE CALCULA
    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];
      const summary = route.summary; // { totalDistance: meters, totalTime: seconds }

      // Leaflet devuelve [Lat, Lng], pero GeoJSON/Mongo necesita [Lng, Lat]
      // Mapeamos las coordenadas para guardarlas limpias
      const coordinates = route.coordinates.map((c) => [c.lng, c.lat]);

      // Enviamos la data al padre para que pueda ser guardada
      setRouteInfo({
        summary,
        coordinates: coordinates,
      });
    });

    // Limpieza al desmontar (muy importante para evitar errores al salir de la pantalla)
    return () => {
      try {
        map.removeControl(routingControl);
      } catch (e) {
        console.warn("Control ya removido");
      }
    };
  }, [map, startPoint, endPoint]); // Se recalcula si cambias el inicio o fin programáticamente

  return null;
};
