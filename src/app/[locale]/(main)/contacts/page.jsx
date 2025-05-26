"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import Contacts from "@/components/Contacts";

import CloseIcon from "@/icons/CloseIcon";
import InstagramIcon from "@/icons/InstagramIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import WeChatIcon from "@/icons/WeChatIcon";
import WhatsAppIcon from "@/icons/WhatsAppIcon";
import WeChatImg from "@/images/weChat.jpg";

import { events, Track } from "@/metrics";
import { colors } from "@/theme";
import { useTranslations, useLocale } from "next-intl";

function ContactsPage() {
  const tContacts = useTranslations("contacts");
  const currentLang = useLocale();

  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);

  const igUrls = {
    fr: "https://www.instagram.com/beglarian_tissu",
    en: "https://www.instagram.com/beglarianfabrics/",
    ru: "https://www.instagram.com/beglarian_tkani/",
  };

  const instagram =
    igUrls[currentLang] || "https://www.instagram.com/beglarianfabrics/";

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          p: "30px",
          display: "flex",
          flexDirection: "column",
          maxWidth: 700,
        }}
      >
        <Typography variant="h1" sx={{ my: "60px", fontSize: "32px" }}>
          {tContacts("title")}
        </Typography>
        <Contacts textColor={colors.darkGrey} iconsColor={colors.darkGrey} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flexStart",
            gap: "16px",
            marginTop: "60px",
          }}
        >
          <Link target="_blank" href="https://t.me/Beglarian_fabrics">
            <TelegramIcon sx={{ fontSize: "36px" }} />
          </Link>
          <Link
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=33764802961"
          >
            <WhatsAppIcon sx={{ fontSize: "36px" }} />
          </Link>
          {currentLang === "cn" && (
            <Link
              onClick={() => {
                setIsWeChatModalOpen(true);
              }}
            >
              <WeChatIcon sx={{ fontSize: "36px", cursor: "pointer" }} />
            </Link>
          )}
          {currentLang !== "cn" && (
            <Link target="_blank" href={instagram}>
              <InstagramIcon sx={{ fontSize: "36px" }} />
            </Link>
          )}
        </Box>
      </Box>

      <Modal
        disableAutoFocus={true}
        disableEnforceFocus={true}
        open={isWeChatModalOpen}
        onClose={() => setIsWeChatModalOpen(false)}
      >
        <Paper
          sx={{
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            p: "64px",
            transform: "translate(-50%, -50%)",
            maxWidth: "516px",
            width: "auto",
            borderRadius: "8px",
          }}
        >
          <CloseIcon
            onClick={() => setIsWeChatModalOpen(false)}
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              color: `${colors.almostBlack}`,
              cursor: "pointer",
            }}
          />

          <img src={WeChatImg} width="200" />
        </Paper>
      </Modal>

      <Track eventName={events.contactsPage.shown} />
    </Box>
  );
}

export default ContactsPage;
