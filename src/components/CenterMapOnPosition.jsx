import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useRoutegramStore } from "../hooks/useRoutegramStore";

export const CenterMapOnPosition = ({ setCurrentPosition }) => {
  const map = useMap();
  const { activeRouteScene } = useRoutegramStore();

  useEffect(() => {
    //*LOGICA PARA TOMAR LA POSICION ACTUAL SEGUN EL NAVEGADOR
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const myCurrentPosition = [latitude, longitude];
      map.flyTo(myCurrentPosition, 15, { duration: 2 });
      setCurrentPosition(myCurrentPosition);
    };

    const error = () => {
      console.log("Error");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation is not suported");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    //*LOGICA PARA TOMAR LA POSICION ACTUAL SEGUN EL NAVEGADOR
  }, [map, setCurrentPosition, activeRouteScene]);
  return null;
};
