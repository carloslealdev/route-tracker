import { Box, Button, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../hooks/useAuthStore";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  identityCard: "",
  password: "",
  phone: "",
  address: "",
  role: "",
};

const roles = [
  { id: "Admin", name: "Administrador" },
  { id: "Worker", name: "Trabajador" },
];

const phoneRegExp =
  /^\+?([0-9]{1,4})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/;

const userSchema = Yup.object({
  firstName: Yup.string().required("Nombre es requerido"),
  lastName: Yup.string().required("Apellido es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
  identityCard: Yup.string().required("Cédula es requerida"),
  phone: Yup.string()
    .matches(phoneRegExp, "Telefono no es valido")
    .required("Telefono es requerido"),
  email: Yup.string()
    .email("Email no es valido")
    .required("Email es requerido"),
  address: Yup.string().required("Dirección es requerida"),
  role: Yup.string().required("Rol es requerido"),
});

export const Register = () => {
  const { startRegister, isSubmitting } = useAuthStore();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    startRegister({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      identityCard: values.identityCard,
      password: values.password,
      phone: values.phone,
      address: values.address,
      role: values.role,
    });
    resetForm();
  };

  return (
    <Box>
      <Header title="Crear usuario" subtitle="Registro de nuevos usuarios" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                variant="filled"
                type="text"
                label="Nombre"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Apellido"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Cédula"
                name="identityCard"
                value={values.identityCard}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.identityCard && !!errors.identityCard}
                helperText={touched.identityCard && errors.identityCard}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Correo electronico"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Télefono"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Dirección"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              <TextField
                variant="filled"
                // type="text"
                select
                label="Seleccionar Rol"
                name="role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                defaultValue={""}
                sx={{
                  gridColumn: "span 2",
                }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="filled"
                type="password"
                label="Contraseña"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 2",
                }}
              />
            </Box>

            <Box
              sx={{ mt: "20px", display: "flex", justifyContent: "flex-end" }}
            >
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Crear Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
