import Swal from "sweetalert2";
import { testUser } from "../../fixtures/testUser";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";

const loginFormFields = {
  loginCedula: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerCedula: "",
  registerPassword1: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const {
    loginCedula,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerCedula,
    registerPassword1,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ identityCard: loginCedula, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword1 !== registerPassword2) {
      Swal.fire(
        "Error en registro",
        "Las contraseñas deben coincidir",
        "error"
      );
      return;
    }
    startRegister({
      name: registerName,
      identityCard: registerCedula,
      password: registerPassword1,
    });
  };

  return (
    <>
      <div className="forms-container">
        <div className="form-login-container">
          <h2>Ingreso</h2>
          <form className="form-login" onSubmit={loginSubmit}>
            <input
              type="text"
              placeholder="Cédula"
              name="loginCedula"
              value={loginCedula}
              onChange={onLoginInputChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
            <button className="btn-form" type="submit">
              Ingresar
            </button>
          </form>
        </div>

        <div className="form-register-container">
          <h2>Registro</h2>
          <form className="form-register" onSubmit={registerSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="registerName"
              value={registerName}
              onChange={onRegisterInputChange}
            />
            <input
              type="text"
              placeholder="Cédula"
              name="registerCedula"
              value={registerCedula}
              onChange={onRegisterInputChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="registerPassword1"
              value={registerPassword1}
              onChange={onRegisterInputChange}
            />
            <input
              type="password"
              placeholder="Repite la contraseña"
              name="registerPassword2"
              value={registerPassword2}
              onChange={onRegisterInputChange}
            />
            <button className="btn-form" type="submit">
              Registrar Usuario
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
