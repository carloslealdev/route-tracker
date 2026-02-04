import React from "react";
import { Header } from "../components/Header";
import { Box, Typography } from "@mui/material";
import { TotalEmployees } from "./indicators/TotalEmployees";
import { TotalRoutegrams } from "./indicators/TotalRoutegrams";
import { LongestRoutegram } from "./indicators/LongestRoutegram";
import { ShortestRoutegram } from "./indicators/ShortestRoutegram";

export const Dashboard = () => {
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
              width: "50%",
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
                {/* CONTENEDOR SUPERIOR IZQUIERDO */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                >
                  <TotalEmployees />
                </Box>
                {/* CONTENEDOR SUPERIOR DERECHO */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                >
                  <TotalRoutegrams />
                </Box>
              </Box>
              {/* CONTENEDOR INFERIOR */}
              <Box
                sx={{
                  width: "100%",
                  height: "70%",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              ></Box>
            </Box>
          </Box>

          {/* CONTENEDOR DERECHO */}
          <Box
            sx={{
              width: "50%",
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
                  width: "100%",
                  height: "70%",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              ></Box>
              {/* CONTENEDOR INFERIOR */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "30%",
                  gap: "20px",
                }}
              >
                {/* CONTENEDOR INFERIOR IZQUIERDO */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                >
                  <LongestRoutegram />
                </Box>
                {/* CONTENEDOR INFERIOR DERECHO */}
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                  }}
                >
                  <ShortestRoutegram />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
