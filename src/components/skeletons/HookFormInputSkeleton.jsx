import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

export default function HookFormInputSkeleton(props) {
  const { sx } = props;

  const labelWidth = Math.floor(Math.random() * (160 - 60 + 1)) + 60;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: "16px",
        ...sx,
      }}
    >
      <Skeleton animation="wave" sx={{ width: `${labelWidth}px` }} />
      <Skeleton
        animation="wave"
        sx={{ width: "100%", height: "80px", borderRadius: "8px" }}
      />
    </Box>
  );
}
