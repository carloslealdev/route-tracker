import { useDispatch, useSelector } from "react-redux";
import {
  onCloseRoutegramModal,
  onOpenRoutegramModal,
  onUpdating,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isRoutegramModalOpen, typeRoutegramToEdit, isUpdating } = useSelector(
    (state) => state.ui
  );

  const openRoutegramModal = (typeRoute) => {
    dispatch(onOpenRoutegramModal(typeRoute));
  };

  const closeRoutegramModal = () => {
    dispatch(onCloseRoutegramModal());
  };

  const startUpdatingRoutegram = () => {
    dispatch(onUpdating());
  };

  return {
    //*Propiedades
    isRoutegramModalOpen,
    typeRoutegramToEdit,
    isUpdating,

    //*Métodos
    openRoutegramModal,
    closeRoutegramModal,
    startUpdatingRoutegram,
  };
};
