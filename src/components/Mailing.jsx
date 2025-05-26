"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Label from "./Label";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Mailing(props) {
  const tCommon = useTranslations("common");

  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const { isNew, isSale, title, description, count, id, thumbnails } = props;

  return (
    <Card
      onClick={() => router.push(`/mailings/${id}`)}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        width: "300px",
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
        {thumbnails[0] && (
          <CardMedia
            sx={{ height: "100%", width: "100%" }}
            image={thumbnails[0]}
          />
        )}
        {thumbnails.length > 1 && (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              gap: "1px",
              flexDirection: "column",
            }}
          >
            {thumbnails[1] && (
              <CardMedia
                sx={{ height: "100%", width: "100%" }}
                image={thumbnails[1]}
              />
            )}
            {thumbnails[2] && (
              <CardMedia
                sx={{ height: "100%", width: "100%" }}
                image={thumbnails[2]}
              />
            )}
          </Box>
        )}
      </Box>
      <CardContent>
        <Box sx={{ display: "flex", gap: "8px", mb: "16px" }}>
          {!!isNew && (
            <Label text={tCommon("mailing.new")} variant="promotion" />
          )}
          {!!isSale && <Label text={tCommon("mailing.sale")} variant="sale" />}
          <Label variant="tag" text={`${count} ${tCommon("mailing.pcs")}`} />
        </Box>
        <Typography sx={{ fontSize: "20px", lineHeight: "24px" }} variant="h4">
          {title}
        </Typography>
        {description && (
          <>
            <Divider sx={{ my: "16px" }} />
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
