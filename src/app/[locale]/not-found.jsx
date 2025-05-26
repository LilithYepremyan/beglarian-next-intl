"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";


import { useTranslations } from "next-intl";
import CustomLink from "@/components/CustomLink";

function NotFound() {
  const  tCommon= useTranslations();

  return (
    <Box sx={{ my: "auto" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mb: "60px",
          mt: "23px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: { xs: "320px", sm: "432px", md: "624px" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "colors.almostBlack",
              fontWeight: 600,
              textAlign: "center",
              mb: "16px",
              lineHeight: "140%",
              fontSize: "100px",
            }}
          >
            404
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 400,
              color: "colors.darkGrey",
              fontSize: "16px",
            }}
          >
            {tCommon("errors.fourZeroFour")}
          </Typography>

          <Button
            sx={{ width: "296px", mt: "32px" }}
            component={CustomLink}
            to={"/fabrics"}
            variant="contained"
            color="primary"
          >
            {tCommon("errors.goBack")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
