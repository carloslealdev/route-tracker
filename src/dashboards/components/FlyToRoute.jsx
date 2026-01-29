import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export const FlyToRoute = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.location) {
      // Creamos una capa temporal para calcular el área que ocupa la ruta
      const layer = L.geoJSON(route.location);
      const bounds = layer.getBounds();

      // Verificamos que los bounds sean válidos antes de movernos
      if (bounds.isValid()) {
        map.flyToBounds(bounds, {
          padding: [50, 50], // Margen para que la ruta no toque los bordes
          duration: 1.5, // Segundos que dura la animación
        });
      }
    }
  }, [route, map]);

  return null;
};
