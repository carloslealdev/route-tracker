import { testUser } from "../../fixtures/testUser";
import { useAuthStore } from "../../hooks/useAuthStore";

export const LoginPage = () => {
  const { startLogin, startRegister } = useAuthStore();

  return (
    <>
      <div className="forms-container">
        <div className="form-login-container">
          <h2>Ingreso</h2>
          <form className="form-login">
            <input type="text" placeholder="Cédula" />
            <input type="password" placeholder="Contraseña" />
            <button className="btn-form" onClick={() => startLogin(testUser)}>
              Ingresar
            </button>
          </form>
        </div>

        <div className="form-register-container">
          <h2>Registro</h2>
          <form className="form-register">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Cédula" />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Repite la contraseña" />
            <button className="btn-form">Registrar Usuario</button>
          </form>
        </div>
      </div>
    </>
  );
};
