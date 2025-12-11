//Función para invertir el orden en el que se guardan las coordenadas, porque guarda coords como [lng, lat], pero Leaflet usa [lat, lng]
export const reverseCoordinates = (route = []) => {
  const newCoordinates = [];
  route.forEach((element) => {
    const [a, b] = element;
    const reversedElement = [b, a];
    newCoordinates.push(reversedElement);
  });
  return newCoordinates;
};
