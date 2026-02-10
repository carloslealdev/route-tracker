import { Box, CircularProgress } from "@mui/material";

export const LoadingComponent = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#005504ff" }} size="150px" />
      </Box>
    </>
  );
};
