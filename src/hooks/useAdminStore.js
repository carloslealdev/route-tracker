import { useDispatch, useSelector } from "react-redux";
import {
  onDeleteUser,
  onLoadRoutegrams,
  onLoadUsers,
  onSetActiveUser,
  onSetIsLoading,
  onUpdateUser,
} from "../store/admin/adminSlice";
import routeTrackerApi from "../api/routeTrackerApi";
import Swal from "sweetalert2";

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

  const setActiveUser = (user) => {
    dispatch(onSetActiveUser(user));
  };

  const startDeletingUser = async (id) => {
    dispatch(onSetIsLoading());

    try {
      const { data } = await routeTrackerApi.delete(`/users/${id}`);
      dispatch(onDeleteUser(id));

      Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
    } catch (error) {
      console.log("Error al eliminar usuario", error);
      Swal.fire("Error", "Error al eliminar usuario", "error");
    }
  };

  const startUpdatingUser = async (id, user) => {
    dispatch(onSetIsLoading());

    try {
      const { data } = await routeTrackerApi.put(`/users/${id}`, user);
      dispatch(onUpdateUser(data.user));

      Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
    } catch (error) {
      console.log("Error al actualizar usuario", error);
      Swal.fire("Error", "Error al actualizar usuario", "error");
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
    setActiveUser,
    startDeletingUser,
    startUpdatingUser,
  };
};
