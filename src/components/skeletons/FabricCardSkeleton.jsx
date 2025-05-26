import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

export default function FabricCardSkeleton() {
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 300,
        boxShadow: "none",
        border: "1px solid theme.palette.divider",
      }}
    >
      <CardMedia sx={{ height: 280, position: "relative", cursor: "pointer" }}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={280}
        />
      </CardMedia>
      <CardContent sx={{ background: "none" }}>
        <Box sx={{ pt: 1, display: "flex", justifyContent: "space-between" }}>
          <Skeleton animation="wave" sx={{ width: "60%" }} />
          <Skeleton animation="wave" sx={{ width: "30%" }} />
        </Box>
        <Divider variant="middle" sx={{ my: "16px" }} />
        <Box sx={{ pt: 1, display: "flex", justifyContent: "space-between" }}>
          <Skeleton animation="wave" sx={{ width: "30%" }} />
          <Skeleton animation="wave" sx={{ width: "60%" }} />
        </Box>
        <Box sx={{ pt: 1, display: "flex", justifyContent: "space-between" }}>
          <Skeleton animation="wave" sx={{ width: "30%" }} />
          <Skeleton animation="wave" sx={{ width: "60%" }} />
        </Box>
        <Box sx={{ pt: 1, display: "flex", justifyContent: "space-between" }}>
          <Skeleton animation="wave" sx={{ width: "30%" }} />
          <Skeleton animation="wave" sx={{ width: "60%" }} />
        </Box>
        <Box sx={{ pt: 2, display: "flex", justifyContent: "space-between" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "80%", height: "44px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "15%", height: "44px" }}
          />
        </Box>
        <Box sx={{ pt: 2, display: "flex", justifyContent: "space-between" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "100%", height: "44px" }}
          />
        </Box>
        <Box sx={{ pt: 4.3, display: "flex", justifyContent: "space-between" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ width: "100%", height: "44px" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
