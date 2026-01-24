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
  const { startLogin, errorMessage } = useAuthStore();

  const {
    loginCedula,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ identityCard: loginCedula, password: loginPassword });
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
      </div>
    </>
  );
};
