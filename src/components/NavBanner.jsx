import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

import CustomLink from "./CustomLink";
import navBannerBackground from "@/images/navBanner.jpg";
import { events, track } from "@/metrics";

export default function NavBanner(props) {
  const { sx, header, text, buttonText, to, type } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "24px",
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        borderRadius: "8px",
        backgroundColor: "colors.white",
        backgroundImage: { xs: `url('${navBannerBackground}')`, sm: "none" },
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
        p: "16px",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        ...sx,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontSize: "18px", mb: "8px" }}>
          {header}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            maxWidth: {
              xs: "70%",
              sm: "100%",
            },
          }}
        >
          {text}
        </Typography>
      </Box>
      <Button
        component={CustomLink}
        href={to}
        color="success"
        variant="contained"
        sx={{
          minWidth: {
            xs: "50%",
            sm: "160px",
          },
        }}
        onClick={() => {
          track(events.navBanner.button.click, { type });
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
