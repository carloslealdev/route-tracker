import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useRoutegramStore } from "../hooks/useRoutegramStore";

export const CenterMapCasaTrabajo = ({ setInitialPointCasaTrabajo }) => {
  const map = useMap();

  const { startLoadingMyRoutegrams, loadedRoutes } = useRoutegramStore();

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  useEffect(() => {
    if (loadedRoutes.length > 0) {
      const route = loadedRoutes[0];

      //! Este optional chaining es la mejor implementación para verificar si el usuario
      //! posee rutagrama??
      if (route?.location && route.location.coordinates.length > 0) {
        const firstPoint = [
          route.location.coordinates[0][1],
          route.location.coordinates[0][0],
        ];

        map.flyTo(firstPoint, 15, {
          duration: 1,
        });
        setInitialPointCasaTrabajo(firstPoint);
      }
    }
  }, [loadedRoutes, map, setInitialPointCasaTrabajo]);
  return null;
};
