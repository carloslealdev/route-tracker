import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Chip, Typography } from "@mui/material";
import { mockDataTeam } from "../../fixtures/mockData";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import routeTrackerApi from "../../api/routeTrackerApi";
import { useAdminStore } from "../../hooks/useAdminStore";
import Swal from "sweetalert2";
import { FormEditUserInfoModal } from "../components/FormEditUserInfoModal";
import { useUiStore } from "../../hooks/useUiStore";

export const Employees = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const {
    startLoadingUsers,
    users,
    isLoading,
    setActiveUser,
    startDeletingUser,
  } = useAdminStore();

  const { openUserInfoModal } = useUiStore();

  const handleEditUser = (user) => {
    setActiveUser(user);
    openUserInfoModal();
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingUser(id);
      }
    });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "Nombre",
      // flex: 1,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      // flex: 1,
    },
    {
      field: "identityCard",
      headerName: "Cédula",
      // flex: 1,
    },
    {
      field: "phone",
      headerName: "Telefono",
      // flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      // flex: 1,
    },
    {
      field: "address",
      headerName: "Direccion",
      // flex: 1,
    },
    {
      field: "routegrams",
      headerName: "Rutagramas activos",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { routegrams } }) => {
        return (
          <Box
            width="100%"
            m="5px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            gap={2}
          >
            {routegrams.map((routegram) => (
              <Chip
                key={routegram._id}
                label={routegram.typeRoute}
                color="primary"
              />
            ))}
          </Box>
        );
      },
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="70%"
            m="8px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={role === "Admin" ? "#008307ff" : "#005504ff"}
            borderRadius="4px"
          >
            {role === "Admin" ? <SecurityIcon /> : <PersonIcon />}
            <Typography>{role}</Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box display="flex" justifyContent="center" gap={2} m="8px">
            <Button variant="contained" onClick={() => handleEditUser(row)}>
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteUser(row._id)}
            >
              Eliminar
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    startLoadingUsers().then(() => {
      setIsFirstLoading(false);
    });
  }, []);

  if (isFirstLoading) return <h1>Loading...</h1>;

  // const handleSetActiveUser = (user) => {
  //   setActiveUser(user);
  // };

  return (
    <Box>
      <Header
        title="Empleados"
        subtitle="Visualización y gestión de empleados"
      />

      <Box mt="40px" height="75vh">
        <DataGrid
          className="dataGrid-adminDashboard"
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>

      <FormEditUserInfoModal />
    </Box>
  );
};
