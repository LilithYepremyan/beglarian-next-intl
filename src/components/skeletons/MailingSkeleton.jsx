import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function MailingSkeleton() {
  return (
    <Card
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "267px",
          display: "flex",
          gap: "1px",
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            gap: "1px",
            flexDirection: "column",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <CardContent sx={{ width: "100%" }}>
        <Skeleton
          animation="wave"
          sx={{ width: "15%", height: "35px", mt: "-8px" }}
        />
        <Skeleton animation="wave" sx={{ width: "90%", mt: "16px" }} />
        <Skeleton animation="wave" sx={{ width: "65%" }} />
        <Divider sx={{ my: "16px" }} />
        <Skeleton animation="wave" sx={{ width: "90%", mt: "8px" }} />
        <Skeleton animation="wave" sx={{ width: "34%" }} />
      </CardContent>
    </Card>
  );
}
