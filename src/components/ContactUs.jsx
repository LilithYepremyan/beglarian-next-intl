import ClickAwayListener from '@mui/material/ClickAwayListener';

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";

import IconButton from "../components/IconButton";
import ChatIcon from "@/icons/ChatIcon";
import CloseIcon from "@/icons/CloseIcon";
import EmailIcon from "@/icons/EmailIcon";
import TelegramIcon from "@/icons/TelegramIcon";
import WeChatIcon from "@/icons/WeChatIcon";
import WhatsAppIcon from "@/icons/WhatsAppIcon";
import WeChatImg from "@/images/weChat.jpg";
import { events, track, Track } from "@/metrics";
import { useLocale } from 'next-intl';
 
export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
    const currentLang = useLocale();

  

  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1,
            height: isOpen ? "290px" : "0px",
            transition: "height 0.2s ease-in-out",
          }}
        >
          <Link
            sx={{
              lineHeight: "0%",
              position: "absolute",
              bottom: "75%",
            }}
            onClick={() => {
              track(events.contactUs.email);
            }}
            target="_blank"
            href="mailto:info@beglarianfabrics.com"
          >
            <EmailIcon
              sx={{
                fontSize: "60px",
                padding: "5px",
                border: "1px solid #fff",
                backgroundColor: "colors.golder",
                borderRadius: "50%",
                color: "#fff",
              }}
            />
          </Link>
          <Link
            sx={{
              lineHeight: "0%",
              position: "absolute",
              bottom: "50%",
            }}
            onClick={() => {
              track(events.contactUs.whatsApp);
            }}
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=33764802961"
          >
            <WhatsAppIcon
              sx={{
                fontSize: "60px",
                border: "1px solid #fff",
                borderRadius: "50%",
              }}
            />
          </Link>
          {currentLang === "cn" && (
            <Link
              onClick={() => {
                setIsOpen(false);
                setIsWeChatModalOpen(true);
                track(events.contactUs.weChat);
              }}
              sx={{
                lineHeight: "0%",
                position: "absolute",
                bottom: "25%",
                cursor: "pointer",
              }}
            >
              <WeChatIcon
                sx={{
                  fontSize: "60px",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                }}
              />
            </Link>
          )}
          {currentLang !== "cn" && (
            <Link
              sx={{
                lineHeight: "0%",
                position: "absolute",
                bottom: "25%",
              }}
              onClick={() => {
                track(events.contactUs.telegram);
              }}
              target="_blank"
              href="https://t.me/Beglarian_fabrics"
            >
              <TelegramIcon
                sx={{
                  fontSize: "60px",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                }}
              />
            </Link>
          )}
          <IconButton
            sx={{ borderRadius: "50%", p: "16px", border: "1px solid #ffffff" }}
            color="primary"
            icon={ChatIcon}
            variant="contained"
            fontSize="26px"
            onClick={() => {
              track(!isOpen ? events.contactUs.open : events.contactUs.close);

              setIsOpen(!isOpen);
            }}
          />

          <Track eventName={events.contactUs.shown} />
        </Box>
      </ClickAwayListener>

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
              color: "colors.almostBlack",
              cursor: "pointer",
            }}
          />

          <img src={WeChatImg} width="200" />
        </Paper>
      </Modal>
    </>
  );
}
