import { useMapEvent } from "react-leaflet";

export const HandleClick = ({ route, setRoute }) => {
  useMapEvent("click", (event) => {
    // console.log({ latlng });

    const { lat, lng } = event.latlng;

    setRoute((prevRoute) => [...prevRoute, [lat, lng]]);
    // console.log(route);
  });

  return null;
};
