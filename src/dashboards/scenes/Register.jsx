import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../components/Header";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  identityCard: "",
  phone: "",
  email: "",
  address: "",
  role: "",
};

const phoneRegExp =
  /^\+?([0-9]{1,4})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/;

const userSchema = Yup.object({
  firstName: Yup.string().required("Nombre es requerido"),
  lastName: Yup.string().required("Apellido es requerido"),
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values);
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
            </Box>
          </form>
        )}
      </Formik>
      <Box sx={{ mt: "20px", display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained">
          Crear Usuario
        </Button>
      </Box>
    </Box>
  );
};
