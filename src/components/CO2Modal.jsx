import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

import CloseIcon from "@/icons/CloseIcon";
import CO2Icon from "@/icons/CO2Icon";
import { useTranslations } from "next-intl";

export default function CO2Modal(props) {
  const { isOpen, close } = props;

  const tModals = useTranslations("modals");

  return (
    <Modal
      disableAutoFocus={true}
      disableEnforceFocus={true}
      open={isOpen}
      onClose={close}
    >
      <Paper
        sx={{
          boxSizing: "border-box",
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          p: "32px",
          transform: "translate(-50%, -50%)",
          maxWidth: "356px",
          borderRadius: "8px",
          width: "90%",
        }}
      >
        <CloseIcon
          onClick={() => close()}
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "colors.almostBlack",
            cursor: "pointer",
          }}
        />
        <CO2Icon
          sx={{ color: "colors.almostBlack", fontSize: "48px", mb: "32px" }}
        />
        <Typography variant="body2" component="div" sx={{ mb: "32px" }}>
          {tModals("co2.title")}
          <br />
          <br />
        </Typography>
        <Typography>
          {tModals.rich("co2.text", {
            br: () => <br />,
            strong: (chunk) => <strong>{chunk}</strong>,
            ul: (chunk) => <ul>{chunk}</ul>,
            li: (chunk) => <li>{chunk}</li>,
          })}
        </Typography>
      </Paper>
    </Modal>
  );
}
