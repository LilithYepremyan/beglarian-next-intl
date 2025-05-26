import Chip from "@mui/material/Chip";
import * as React from "react";

import { colors as palette } from "@/theme";

const backgrounds = {
  promotion: palette.brightBlue,
  sale: palette.red,
  material: "transparent",
  tag: palette.lightGrey,
  secondary: palette.lightGrey,
  success: palette.golder,
  resolved: palette.brightGreen,
  alert: palette.red,
};

const colors = {
  sale: palette.white,
  promotion: palette.white,
  material: palette.golder,
  tag: palette.almostBlack,
  secondary: palette.almostBlack,
  success: palette.white,
  resolved: palette.white,
  alert: palette.white,
};

const borderColors = {
  sale: palette.red,
  promotion: palette.brightBlue,
  material: palette.golder,
  tag: palette.lightGrey,
  secondary: palette.lightGrey,
  success: palette.golder,
  resolved: palette.brightGreen,
  alert: palette.red,
};

export default function Label(props) {
  const { text, variant = "tag", sx } = props;

  const background = backgrounds[variant];
  const color = colors[variant];
  const borderColor = borderColors[variant];
  const textTransform =
    variant === "promotion" || variant === "sale" || variant === "material"
      ? "uppercase"
      : "none";
  const fontSize = variant === "material" ? "14px" : "12px";
  const height =
    variant === "promotion" || variant === "sale" || variant === "tag"
      ? "24px"
      : "20px";
  const padding =
    variant === "promotion" || variant === "sale" || variant === "tag"
      ? "0 8px"
      : "0 4px";

  return (
    <Chip
      label={text}
      sx={{
        padding,
        height,
        fontWeight: 600,
        border: "1px",
        borderStyle: "solid",
        borderRadius: "6px",
        fontSize,
        textTransform,
        background,
        color,
        borderColor,
        ...sx,
      }}
    />
  );
}
