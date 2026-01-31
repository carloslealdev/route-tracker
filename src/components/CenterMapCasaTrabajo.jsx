import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useRoutegramStore } from "../hooks/useRoutegramStore";

export const CenterMapCasaTrabajo = ({ setInitialPointCasaTrabajo }) => {
  const map = useMap();

  const { startLoadingMyRoutegrams, loadedRoutes, routeCasaTrabajo } =
    useRoutegramStore();

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  useEffect(() => {
    if (routeCasaTrabajo) {
      if (
        routeCasaTrabajo.location &&
        routeCasaTrabajo.location.coordinates.length > 0
      ) {
        // const firstPoint = [
        //   routeCasaTrabajo.location.coordinates[0][1],
        //   routeCasaTrabajo.location.coordinates[0][0],
        // ];

        // map.flyTo(firstPoint, 15, {
        //   duration: 1,
        // });
        // setInitialPointCasaTrabajo(firstPoint);

        const layer = L.geoJSON(routeCasaTrabajo.location);
        const bounds = layer.getBounds();

        if (bounds.isValid()) {
          map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 1.5,
          });
        }
      }
    }
  }, [loadedRoutes, map, setInitialPointCasaTrabajo]);
  return null;
};
