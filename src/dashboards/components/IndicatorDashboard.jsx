import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const IndicatorDashboard = ({ title, subtitle, value, icon }) => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#32373d",
        color: "white",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {subtitle}
          </Typography>
          {/* <Stack direction="row" spacing={1}>
            <Chip
              label="Casa-Trabajo"
              size="small"
              color={hasCasaTrabajo ? "primary" : "default"}
            />
            <Chip
              label="Trabajo-Casa"
              size="small"
              color={hasTrabajoCasa ? "primary" : "default"}
            />
          </Stack> */}
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
