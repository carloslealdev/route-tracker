import { useDispatch, useSelector } from "react-redux";
import {
  onCloseRoutegramModal,
  onCloseUserInfoModal,
  onOpenRoutegramModal,
  onOpenUserInfoModal,
  onUpdating,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    isRoutegramModalOpen,
    typeRoutegramToEdit,
    isUpdating,
    isUserInfoModalOpen,
  } = useSelector((state) => state.ui);

  const openRoutegramModal = (typeRoute) => {
    dispatch(onOpenRoutegramModal(typeRoute));
  };

  const closeRoutegramModal = () => {
    dispatch(onCloseRoutegramModal());
  };

  const startUpdatingRoutegram = (typeRoute) => {
    dispatch(onUpdating(typeRoute));
  };

  const openUserInfoModal = () => {
    dispatch(onOpenUserInfoModal());
  };

  const closeUserInfoModal = () => {
    dispatch(onCloseUserInfoModal());
  };

  return {
    //*Propiedades
    isRoutegramModalOpen,
    typeRoutegramToEdit,
    isUpdating,
    isUserInfoModalOpen,

    //*Métodos
    openRoutegramModal,
    closeRoutegramModal,
    startUpdatingRoutegram,
    openUserInfoModal,
    closeUserInfoModal,
  };
};
