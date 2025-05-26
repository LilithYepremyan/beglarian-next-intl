import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

export default function InvoiceCardSkeleton() {
  return (
    <Card sx={{ width: "100%", minWidth: 345 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "160px" }} />
          <Skeleton animation="wave" sx={{ width: "80px" }} />
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            my: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "140px" }} />
          <Skeleton animation="wave" sx={{ width: "110px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "140px" }} />
          <Skeleton animation="wave" sx={{ width: "110px" }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "140px" }} />
          <Skeleton animation="wave" sx={{ width: "110px" }} />
        </Box>

        <Box
          sx={{
            mt: "16px",
          }}
        >
          <Skeleton animation="wave" sx={{ width: "100%", height: "48px" }} />
        </Box>
      </CardContent>
    </Card>
  );
}
