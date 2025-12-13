import { useMapEvent } from "react-leaflet";
import { useRoutegramStore } from "../hooks/useRoutegramStore";

export const HandleClick = () => {
  const { addPointToDraft } = useRoutegramStore();
  useMapEvent("click", (event) => {
    const { lat, lng } = event.latlng;
    const pointToDraft = [lat, lng];
    addPointToDraft(pointToDraft);
  });

  return null;
};
