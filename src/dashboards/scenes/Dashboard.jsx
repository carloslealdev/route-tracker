import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Box, Typography } from "@mui/material";
import { TotalEmployees } from "./indicators/TotalEmployees";
import { TotalRoutegrams } from "./indicators/TotalRoutegrams";
import { LongestRoutegram } from "./indicators/LongestRoutegram";
import { ShortestRoutegram } from "./indicators/ShortestRoutegram";
import { DistanceRangeGraph } from "./indicators/DistanceRangeGraph";
import { useAdminStore } from "../../hooks/useAdminStore";

export const Dashboard = () => {
  const {
    startLoadingDashboardStats,
    dashboardStats,
    isLoadingDashboardStats,
  } = useAdminStore();

  useEffect(() => {
    startLoadingDashboardStats();
  }, []);

  const {
    totalEmployees,
    totalRoutegrams,
    longestRoute,
    shortestRoute,
    distanceRangeGraph,
  } = dashboardStats;

  if (isLoadingDashboardStats) return <h1>Cargando...</h1>;

  return (
    <>
      <Box
        sx={{
          height: "100%", // Fill parent
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header
          title="Dashboard"
          subtitle="Visualización general de datos del sistema"
        />

        {/* CONTENEDOR PRINCIPAL */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          {/* CONTENEDOR IZQUIERDO */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "100%",
              }}
            >
              {/* CONTENEDOR SUPERIOR */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "30%",
                  gap: "20px",
                }}
              >
                {/* PRIMER CONTENEDOR */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #616161ff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#0a0b0cff",
                    padding: "20px",
                  }}
                >
                  <TotalEmployees totalEmployees={totalEmployees} />
                </Box>
                {/* SEGUNDO CONTENEDOR */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #616161ff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#0a0b0cff",
                    padding: "20px",
                  }}
                >
                  <TotalRoutegrams totalRoutegrams={totalRoutegrams} />
                </Box>

                {/* TERCER CONTENEDOR */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #616161ff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#0a0b0cff",

                    padding: "20px",
                  }}
                >
                  <LongestRoutegram longestRoute={longestRoute} />
                </Box>

                {/* CUARTO CONTENEDOR */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #616161ff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#0a0b0cff",

                    padding: "20px",
                  }}
                >
                  <ShortestRoutegram shortestRoute={shortestRoute} />
                </Box>
              </Box>
              {/* CONTENEDOR INFERIOR */}
              <Box
                sx={{
                  width: "100%",
                  height: "70%",
                  border: "1px solid #616161ff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#0a0b0cff",
                  padding: "20px",
                }}
              >
                <DistanceRangeGraph distanceRangeGraph={distanceRangeGraph} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
