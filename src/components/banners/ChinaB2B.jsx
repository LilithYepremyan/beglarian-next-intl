import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import CloseIcon from "@/icons/CloseIcon";
import defaultBanner from "@/images/defaultBanner.jpg";
import WeChatImg from "@/images/weChat.jpg";
import { events, track } from "@/metrics";
import { useTranslations } from "next-intl";

export default function Banner(props) {
  const { sx, onClose } = props;

  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);

  const tBanners = useTranslations("banners");

  return (
    <Box
      sx={{
        p: "24px",
        borderRadius: "8px",
        position: "relative",
        background: `
                                linear-gradient(0deg, rgba(19, 33, 70, 0.50) 20%, 
                                rgba(19, 33, 70, 0.20) 100%), 
                                url(${defaultBanner}), 
                                lightgray 80% / cover no-repeat
                            `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: {
          xs: "flex-start",
        },
        alignItems: "center",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyItems: {
            xs: "flex-start",
            sm: "center",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: {
            xs: "0px",
            sm: "8px",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            width: "100%",
            fontWeight: "bold",
            textDecoration: "none",
            color: "colors.white",
          }}
        >
          {tBanners("chinaB2B.header")}
        </Typography>

        <Button
          onClick={() => {
            track(events.banner.link.click);

            setIsWeChatModalOpen(true);
          }}
          color="success"
          variant="contained"
          sx={{ mt: "24px", minWidth: "120px" }}
        >
          {tBanners("chinaB2B.buttonText")}
        </Button>

        <CloseIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "12px",
            right: "12px",
            color: "colors.white",
            cursor: "pointer",
          }}
        />
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
              color: "colors.almostBlack",
              cursor: "pointer",
            }}
          />

          <img src={WeChatImg} width="200" />
        </Paper>
      </Modal>
    </Box>
  );
}
