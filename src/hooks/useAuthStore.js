import { useDispatch, useSelector } from "react-redux";
import routeTrackerApi from "../api/routeTrackerApi";
import {
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
  onSetIsSubmitted,
  onSetIsSubmitting,
} from "../store/auth/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { status, user, errorMessage, isSubmitting } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const startLogin = async ({ identityCard, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await routeTrackerApi.post("/auth", {
        identityCard,
        password,
      });

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          role: data.role,
          identityCard: data.identityCard,
          email: data.email,
          phone: data.phone,
          address: data.address,
        }),
      );
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({
    firstName,
    lastName,
    email,
    identityCard,
    password,
    phone,
    address,
    role,
  }) => {
    dispatch(onSetIsSubmitting());
    try {
      const { data } = await routeTrackerApi.post("/auth/new", {
        firstName,
        lastName,
        email,
        identityCard,
        password,
        phone,
        address,
        role,
      });

      Swal.fire(
        "Usuario registrado",
        "Usuario registrado exitosamente",
        "success",
      );
      dispatch(onSetIsSubmitted());
    } catch (error) {
      // dispatch(onLogout(error.response.data.msg || ""));
      Swal.fire("Error en registro", "Error al registrar usuario", "error");
      setTimeout(() => {
        dispatch(onClearErrorMessage());
        dispatch(onSetIsSubmitted());
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await routeTrackerApi.get("/auth/renew");

      // console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      //TODO el role no viene en el JWT, lo cual me genera conflicto al estar
      //TODO logueado como Admin y refrescar la pagina
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          role: data.role,
          identityCard: data.identityCard,
          email: data.email,
          phone: data.phone,
          address: data.address,
        }),
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //*PROPIEDADES
    user,
    status,
    errorMessage,
    isSubmitting,

    //*MÉTODOS
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  };
};
