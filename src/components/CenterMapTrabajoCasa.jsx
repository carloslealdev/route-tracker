import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useRoutegramStore } from "../hooks/useRoutegramStore";

export const CenterMapTrabajoCasa = ({ setInitialPointTrabajoCasa }) => {
  const map = useMap();

  const { startLoadingMyRoutegrams, loadedRoutes, routeTrabajoCasa } =
    useRoutegramStore();

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  useEffect(() => {
    if (routeTrabajoCasa) {
      if (
        routeTrabajoCasa.location &&
        routeTrabajoCasa.location.coordinates.length > 0
      ) {
        const firstPoint = [
          routeTrabajoCasa.location.coordinates[0][1],
          routeTrabajoCasa.location.coordinates[0][0],
        ];

        map.flyTo(firstPoint, 15, {
          duration: 1,
        });
        setInitialPointTrabajoCasa(firstPoint);
      }
    }
  }, [loadedRoutes, map, setInitialPointTrabajoCasa]);
  return null;
};
