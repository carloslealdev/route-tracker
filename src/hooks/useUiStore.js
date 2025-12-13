import { useDispatch, useSelector } from "react-redux";
import {
  onCloseRoutegramModal,
  onOpenRoutegramModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isRoutegramModalOpen, typeRoutegramToEdit } = useSelector(
    (state) => state.ui
  );

  const openRoutegramModal = (typeRoute) => {
    dispatch(onOpenRoutegramModal(typeRoute));
  };

  const closeRoutegramModal = () => {
    dispatch(onCloseRoutegramModal());
  };

  return {
    //*Propiedades
    isRoutegramModalOpen,
    typeRoutegramToEdit,

    //*Métodos
    openRoutegramModal,
    closeRoutegramModal,
  };
};
