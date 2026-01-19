import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Typography } from "@mui/material";
import { mockDataTeam } from "../../fixtures/mockData";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import routeTrackerApi from "../../api/routeTrackerApi";
import { useAdminStore } from "../../hooks/useAdminStore";

export const Employees = () => {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "identityCard",
      headerName: "Cedula",
      // type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
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
            width="40%"
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
    // {
    //   field: "phone",
    //   headerName: "Telefono",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="40%"
            m="8px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={role === "admin" ? "#008307ff" : "#005504ff"}
            borderRadius="4px"
          >
            {role === "Admin" ? <SecurityIcon /> : <PersonIcon />}
            <Typography>{role}</Typography>
          </Box>
        );
      },
    },
  ];

  const { startLoadingUsers, users, isLoading } = useAdminStore();

  useEffect(() => {
    startLoadingUsers();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

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
        {console.log(users)}
      </Box>
    </Box>
  );
};
