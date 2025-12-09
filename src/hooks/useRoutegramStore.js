import { useDispatch, useSelector } from "react-redux";
import routeTrackerApi from "../api/routeTrackerApi";
import {
  onCheckingRoutegrams,
  onLoadRoutegram,
} from "../store/routegram/routegramSlice";

export const useRoutegramStore = () => {
  const {
    isLoading,
    errorMessage,
    activeRoute,
    loadedRoutes,
    isDrawing,
    draftPoints,
  } = useSelector((state) => state.routegram);

  const dispatch = useDispatch();

  const startLoadingMyRoutegrams = async () => {
    dispatch(onCheckingRoutegrams());
    // console.log("HOLA");

    try {
      const { data } = await routeTrackerApi.get("/routegrams/my-routegrams");

      const { routegrams } = data;

      dispatch(onLoadRoutegram(routegrams));
      console.log(routegrams);
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
    loadedRoutes,

    //*Métodos
    startLoadingMyRoutegrams,
  };
};
