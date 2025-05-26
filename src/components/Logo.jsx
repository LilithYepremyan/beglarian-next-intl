import React from "react";
import CustomLink from "./CustomLink";
import LogoWhite from "@/images/beglarian_fabrics_logo_white.svg";
import Image from "next/image";

export default function Logo(props) {
  const { sx, width = 100 } = props;
  return (
    <CustomLink
      sx={{ ...sx, display: "flex", cursor: "pointer" }}
      href={`/${process.env.NEXT_PUBLIC_MEDIA_URL}`}
    >
      <Image width={width} src={LogoWhite} alt="Logo"></Image>
    </CustomLink>
  );
}
