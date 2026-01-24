import { useDispatch, useSelector } from "react-redux";
import routeTrackerApi from "../api/routeTrackerApi";
import {
  onAddPointToDraft,
  onCheckingRoutegrams,
  onClearDraft,
  onDeleteRoutegram,
  onLoadRoutegram,
  onRemoveLastPoint,
  onResetActiveRoutegram,
  onResetLoadedRoutegrams,
  onSaveRoutegram,
  onSavingRoute,
  onSetActiveRoutegram,
  onSetRougramScene,
  onUpdateRoutegram,
} from "../store/routegram/routegramSlice";
import Swal from "sweetalert2";

export const useRoutegramStore = () => {
  const {
    isLoading,
    errorMessage,
    activeRoute,
    loadedRoutes,
    isDrawing,
    draftPoints,
    activeRouteScene,
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

  const startSavingRoutegram = async (geoJsonData) => {
    dispatch(onSavingRoute());
    try {
      const { data } = await routeTrackerApi.post("/routegrams", geoJsonData);
      dispatch(onSaveRoutegram(data));
      console.log(data);

      Swal.fire("Rutagrama guardado con exito", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const startUpdatingRoutegram = async (routegramId, newGeoJsonData) => {
    // dispatch(onSaveRoutegram());

    try {
      const { data } = await routeTrackerApi.put(
        `routegrams/${routegramId}`,
        newGeoJsonData,
      );
      dispatch(onUpdateRoutegram(data.routegram));

      Swal.fire("Rutagrama actualizado con exito", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingRoutegram = async (id) => {
    try {
      await routeTrackerApi.delete(`/routegrams/${id}`);
      dispatch(onDeleteRoutegram(id));
      Swal.fire("Rutagrama eliminado", "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("No se pudo eliminar el rutagrama", "", "error");
    }
  };

  const addPointToDraft = (point) => {
    dispatch(onAddPointToDraft(point));
  };

  const removeLastPoint = () => {
    dispatch(onRemoveLastPoint());
  };

  const setActiveRoutegram = (routegram) => {
    dispatch(onSetActiveRoutegram(routegram));
  };

  const setActiveRoutegramScene = (routegram) => {
    dispatch(onSetRougramScene(routegram));
  };

  const resetActiveRoutegram = () => {
    dispatch(onResetActiveRoutegram());
  };

  const resetLoadedRoutegrams = () => {
    dispatch(onResetLoadedRoutegrams());
  };

  const clearDraftPoints = () => {
    dispatch(onClearDraft());
  };

  // Buscamos la ruta Casa-Trabajo sin importar si está en la pos 0, 1 o 500
  const routeCasaTrabajo = loadedRoutes.find(
    (r) => r.typeRoute === "Casa-Trabajo",
  );

  // Buscamos la ruta Trabajo-Casa
  const routeTrabajoCasa = loadedRoutes.find(
    (r) => r.typeRoute === "Trabajo-Casa",
  );

  return {
    //*Propiedades
    isLoading,
    errorMessage,
    activeRoute,
    isDrawing,
    draftPoints,
    loadedRoutes,
    activeRouteScene,

    //*Propiedades Computadas
    routeCasaTrabajo,
    routeTrabajoCasa,

    //*Métodos
    startLoadingMyRoutegrams,
    startSavingRoutegram,
    startUpdatingRoutegram,
    startDeletingRoutegram,
    addPointToDraft,
    removeLastPoint,
    setActiveRoutegram,
    setActiveRoutegramScene,
    resetActiveRoutegram,
    resetLoadedRoutegrams,
    clearDraftPoints,
  };
};
