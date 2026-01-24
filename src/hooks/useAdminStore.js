import { useDispatch, useSelector } from "react-redux";
import {
  onLoadRoutegrams,
  onLoadUsers,
  onSetIsLoading,
} from "../store/admin/adminSlice";
import routeTrackerApi from "../api/routeTrackerApi";

export const useAdminStore = () => {
  const { users, routegrams, isLoading, activeUser } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();

  const startLoadingUsers = async () => {
    dispatch(onSetIsLoading());

    try {
      const { data } = await routeTrackerApi.get("/users/all");
      dispatch(onLoadUsers(data.users));
    } catch (error) {
      console.log("Error al cargar usuarios", error);
    }
  };

  const startLoadingRoutegrams = async () => {
    dispatch(onSetIsLoading());

    try {
      const { data } = await routeTrackerApi.get("/routegrams/all");
      dispatch(onLoadRoutegrams(data.routegrams));
    } catch (error) {
      console.log("Error al cargar rutagramas", error);
    }
  };

  return {
    //*Propiedades
    users,
    routegrams,
    isLoading,
    activeUser,
    //*Métodos
    startLoadingUsers,
    startLoadingRoutegrams,
  };
};
