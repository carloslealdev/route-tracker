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
    // if (loadedRoutes.length > 0) {
    if (routeTrabajoCasa) {
      // const route = loadedRoutes[1];

      //! Este optional chaining es la mejor implementación para verificar si el usuario
      //! posee rutagrama??
      // if (route?.location && route.location.coordinates.length > 0) {
      //   const firstPoint = [
      //     route.location.coordinates[0][1],
      //     route.location.coordinates[0][0],
      //   ];

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
