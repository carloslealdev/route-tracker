import { useDispatch, useSelector } from "react-redux";
import routeTrackerApi from "../api/routeTrackerApi";
import {
  onAddPointToDraft,
  onCheckingRoutegrams,
  onLoadRoutegram,
  onRemoveLastPoint,
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
      // console.log(routegrams);
    } catch (error) {
      console.log(error);
    }
  };
  const addPointToDraft = (point) => {
    dispatch(onAddPointToDraft(point));
  };

  const removeLastPoint = () => {
    dispatch(onRemoveLastPoint());
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
    addPointToDraft,
    removeLastPoint,
  };
};
