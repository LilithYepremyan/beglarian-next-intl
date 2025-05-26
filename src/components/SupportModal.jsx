import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import  { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Input from "./Input";
import CloseIcon from "@/icons/CloseIcon";
import SuccessIcon from "@/icons/SuccessIcon";
import { events, Track } from "@/metrics";
import {
  fetchCountries,
  resetState,
  sendSupportRequest,
} from "../store/slices/supportSlice";
import { useTranslations } from "next-intl";

export default function SupportModal(props) {
  const { isOpen, close, title, text, type, userLogin, userPhone } = props;

  const tModals= useTranslations("modals");
  const tAuth = useTranslations("auth");
  const dispatch = useDispatch();
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      email: userLogin || "",
      phone: userPhone || "",
    },
  });

  const {
    data: { isSupportRequestSent, countries },
    isLoading,
  } = useSelector((state) => state.support);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, []);

  const onSubmit = ({ supportRequest, email, phone }) => {
    const request = { supportRequest, type };

    if (email) {
      request.email = email;
    }

    if (phone) {
      request.phone = phone.replace("+", "");
    }

    dispatch(sendSupportRequest(request));
  };

  return (
    <Modal
      disableAutoFocus={true}
      disableEnforceFocus={true}
      open={isOpen}
      onClose={() => {
        if (isSupportRequestSent) {
          setValue("supportRequest", "");
          dispatch(resetState());
        }

        close();
      }}
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
          maxWidth: "516px",
          width: "90%",
          borderRadius: "8px",
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
        {isSupportRequestSent && (
          <SuccessIcon sx={{ fontSize: "48px", mb: "32px" }} />
        )}
        {!isSupportRequestSent && <></>}
        <Typography variant="h3" sx={{ mb: "8px" }}>
          {isSupportRequestSent ? tModals("support.success.title") : title}
        </Typography>

        <Typography sx={{ mb: "32px" }} variant="body2">
          {isSupportRequestSent ? tModals("support.success.text") : text}
        </Typography>

        {!isSupportRequestSent && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {type === "auth" && (
              <>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, _arg, fieldState: { error } }) => (
                    <Input
                      control={control}
                      error={!!error?.message}
                      helperText={error?.message}
                      fullWidth
                      label={tAuth("fields.email.label")}
                      sx={{ mb: "32px" }}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, _arg, fieldState: { error } }) => (
                    <Input
                      control={control}
                      error={!!error?.message}
                      helperText={error?.message}
                      fullWidth
                      label={tAuth("fields.phone.label")}
                      sx={{ mb: "32px" }}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            <Controller
              name="supportRequest"
              control={control}
              render={({ field, _arg, fieldState: { error } }) => (
                <Input
                  control={control}
                  fullWidth
                  sx={{ fontWeight: "400" }}
                  multiline
                  rows={2}
                  error={!!error?.message}
                  helperText={error?.message}
                  placeholder={tModals("support.placeholder")}
                  {...field}
                />
              )}
            />

            <Box
              sx={{
                mt: "32px",
                display: "flex",
                gap: "8px",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() => {
                  close();
                }}
              >
                {tModals("support.buttonSecondary")}
              </Button>

              <Button
                disabled={
                  !(watch("email") || watch("phone") || watch("supportRequest"))
                }
                className={isLoading ? "loading" : ""}
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                {tModals("support.buttonPrimary")}
              </Button>
            </Box>
          </form>
        )}

        {isSupportRequestSent && (
          <>
            <Track
              eventName={events.modals.support.sent}
              eventProps={{ type, text: watch("supportRequest") }}
            />

            <Button
              sx={{ mt: "32px" }}
              color="white"
              variant="outlined"
              fullWidth
              onClick={() => {
                if (isSupportRequestSent) {
                  setValue("supportRequest", "");
                  dispatch(resetState());
                }
                close();
              }}
            >
              {tModals("support.success.button")}
            </Button>
          </>
        )}

        <Track eventName={events.modals.support.shown} eventProps={{ type }} />
      </Paper>
    </Modal>
  );
}
