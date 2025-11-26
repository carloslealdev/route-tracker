import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const CenterMapOnPosition = ({ setCurrentPosition }) => {
  const map = useMap();

  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const myCurrentPosition = [latitude, longitude];

      map.flyTo(myCurrentPosition);

      setCurrentPosition(myCurrentPosition);

      //   console.log(myCurrentPosition);
    };

    const error = () => {
      console.log("Error");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation is not suported");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [map, setCurrentPosition]);
  return null;
};
