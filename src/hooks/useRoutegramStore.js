import { useDispatch, useSelector } from "react-redux";
import routeTrackerApi from "../api/routeTrackerApi";

export const useRoutegramStore = () => {
  const {
    isLoading,
    errorMessage,
    activeRoute,
    isDrawing,
    draftPoints,
    onCheckingRoutegrams,
  } = useSelector((state) => state.routegram);

  const dispatch = useDispatch();

  const startLoadingMyRoutegrams = async () => {
    // dispatch(onCheckingRoutegrams());
    // console.log("HOLA");

    try {
      const { data } = await routeTrackerApi.get("/routegrams/my-routegrams");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //*Propiedades
    isLoading,
    errorMessage,
    activeRoute,
    isDrawing,
    draftPoints,

    //*Métodos
    startLoadingMyRoutegrams,
  };
};
