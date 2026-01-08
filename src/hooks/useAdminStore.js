import { useDispatch, useSelector } from "react-redux";
import { onLoadUsers, onSetIsLoading } from "../store/admin/adminSlice";
import routeTrackerApi from "../api/routeTrackerApi";

export const useAdminStore = () => {
  const { users, isLoading, activeUser } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const startLoadingUsers = async () => {
    dispatch(onSetIsLoading());

    try {
      const { data } = await routeTrackerApi.get("/auth/all");
      dispatch(onLoadUsers(data.users));
    } catch (error) {
      console.log("Error al cargar usuarios", error);
    }
  };

  return {
    //*Propiedades
    users,
    isLoading,
    activeUser,
    //*Métodos
    startLoadingUsers,
  };
};
