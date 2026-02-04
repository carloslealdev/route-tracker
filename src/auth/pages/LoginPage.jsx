import Swal from "sweetalert2";

import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { Box, Button, TextField, Typography } from "@mui/material";

const loginFormFields = {
  loginCedula: "",
  loginPassword: "",
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
      <Box
        className="login-page-container"
        sx={{
          gap: "32px",
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight="bold">
            Bienvenido a Route Tracker App
          </Typography>
          <Typography variant="subtitle1" fontSize={24}>
            Rastrea tus rutas y mantente conectado con tu equipo
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
            }}
          >
            Saber más
          </Button>
        </Box>
        <Box
          // className="form-login-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            height: "600px",
            width: "500px",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Ingresar
          </Typography>

          <form onSubmit={loginSubmit}>
            <TextField
              sx={{
                width: "100%",
                input: {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff83",
                },
              }}
              type="text"
              placeholder="Cédula"
              name="loginCedula"
              value={loginCedula}
              onChange={onLoginInputChange}
            />
            <TextField
              sx={{
                width: "100%",
                mt: 2,
                input: {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff83",
                },
              }}
              type="password"
              placeholder="Contraseña"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              Ingresar
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};
