import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Box, Paper, Typography } from "@mui/material";

export const DistanceRangeGraph = ({ distanceRangeGraph }) => {
  return (
    // <>
    //   <Typography>Grafica</Typography>
    //   {console.log(distanceRangeGraph)}
    // </>

    <Paper
      elevation={3}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0b0cff",
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Distribución de Distancias de Rutagramas
      </Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        mb={2}
        sx={{ color: "white" }}
      >
        Cantidad de empleados según la distancia que recorren.
      </Typography>

      <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={distanceRangeGraph}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />{" "}
            {/* Para no mostrar "1.5 empleados" */}
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            {/* Barra verde corporativa */}
            <Bar
              dataKey="trabajadores"
              fill="#008307"
              radius={[5, 5, 0, 0]}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};
