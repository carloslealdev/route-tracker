import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const CenterMapOnPosition = ({ setCurrentPosition }) => {
  const map = useMap();

  //Codigo prueba
  const locationTest = [40, -105];
  const featureTest = [
    {
      type: "LineString",
      coordinates: [
        [-100, 40],
        [-105, 45],
        [-110, 55],
      ],
    },
    {
      type: "LineString",
      coordinates: [
        [-105, 40],
        [-110, 45],
        [-115, 55],
      ],
    },
  ];
  L.geoJSON(featureTest).addTo(map);
  //Codigo prueba

  useEffect(() => {
    const myCurrentPosition = locationTest;
    map.flyTo(myCurrentPosition);
    setCurrentPosition(myCurrentPosition);

    //*LOGICA PARA TOMAR LA POSICION ACTUAL SEGUN EL NAVEGADOR
    // const success = (position) => {
    //   const latitude = position.coords.latitude;
    //   const longitude = position.coords.longitude;

    //   const myCurrentPosition = [latitude, longitude];
    //   map.flyTo(myCurrentPosition);
    //   setCurrentPosition(myCurrentPosition);

    // };

    // const error = () => {
    //   console.log("Error");
    // };

    // if (!navigator.geolocation) {
    //   console.log("Geolocation is not suported");
    // } else {
    //   navigator.geolocation.getCurrentPosition(success, error);
    // }

    //*LOGICA PARA TOMAR LA POSICION ACTUAL SEGUN EL NAVEGADOR
  }, [map, setCurrentPosition]);
  return null;
};
