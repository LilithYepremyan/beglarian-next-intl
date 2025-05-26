import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import React from "react";

import LinkIcon from "@/icons/LikeIcon";
import LocationIcon from "@/icons/LocationIcon";
import MailIcon from "@/icons/MailIcon";
import PhoneIcon from "@/icons/PhoneIcon";

const ContactItem = styled((props) => <Box {...props} />)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  flexWrap: "nowrap",
}));

export default function Contacts(props) {
  const { textColor, iconsColor, sx } = props;
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", ...sx }}>
      <ContactItem>
        <LocationIcon sx={{ color: iconsColor, fontSize: "24px" }} />
        <Link
          target="_blank"
          href="https://maps.app.goo.gl/xa2MqK3PcGCD7Mws8"
          sx={{ fontSize: "14px", color: textColor }}
        >
          144, Allée des Caillotières, 69400 Gleizé, France
        </Link>
      </ContactItem>
      <ContactItem>
        <PhoneIcon sx={{ color: iconsColor, fontSize: "24px" }} />
        <Link
          target="_blank"
          href="callto:+33764802961"
          sx={{ fontSize: "14px", color: textColor }}
        >
          +33 7 64 80 29 61
        </Link>
      </ContactItem>
      <ContactItem>
        <MailIcon sx={{ color: iconsColor, fontSize: "24px" }} />
        <Link
          href="mailto:info@beglarianfabrics.com"
          sx={{ fontSize: "14px", color: textColor }}
        >
          info@beglarianfabrics.com
        </Link>
      </ContactItem>
      <ContactItem>
        <LinkIcon sx={{ color: iconsColor, fontSize: "24px" }} />
        <Link
          target="_blank"
          href="https://beglarianfabrics.com"
          sx={{ fontSize: "14px", color: textColor }}
        >
          beglarianfabrics.com
        </Link>
      </ContactItem>
    </Box>
  );
}
