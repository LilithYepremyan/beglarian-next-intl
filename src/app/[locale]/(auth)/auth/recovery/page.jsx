"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams, useRouter } from "next/navigation";

import Input from "@/components/Input";
import CustomLink from "@/components/CustomLink";
import SupportModal from "@/components/SupportModal";
import { events, track, Track } from "@/metrics";
import { recovery, reset, resetError } from "@/app/store/slices/authSlice";

export default function PasswordRecovery() {
  const  tAuth  = useTranslations("auth");
  const router = useRouter();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;

  const dispatch = useDispatch();
  const { error: serverSideError, isLoading } = useSelector(
    (state) => state.auth
  );

  const email = searchParams.get("email") ?? "";

  const { handleSubmit, control, setError, watch } = useForm();

  useEffect(() => {
    if (serverSideError?.message === "auth.user.notFound") {
      setError("userLogin", {
        type: "custom",
        message: t("common:errors.serverside.noSuchUser"),
      });
      track(events.passwordRecoveryPage.form.error, { error: "noSuchUser" });
    }

    if (serverSideError?.message === "auth.recovery.notFound") {
      setError("newPassword", {
        type: "custom",
        message: t("common:errors.serverside.recoveryExpired"),
      });
      track(events.newPasswordPage.form.error, { error: "recoveryExpired" });
    }

    if (serverSideError?.message === "auth.recovery.passwordTooShort") {
      setError("newPassword", {
        type: "custom",
        message: t("common:errors.serverside.passwordTooShort"),
      });
      track(events.newPasswordPage.form.error, { error: "passwordTooShort" });
    }

    return () => {
      dispatch(resetError());
    };
  }, [serverSideError?.id]);

  const onSubmit = ({ userLogin, newPassword }) => {
    if (userLogin) {
      dispatch(recovery({ userLogin }));
      track(events.passwordRecoveryPage.form.submit);
    }

    if (newPassword && id) {
      dispatch(reset({ newPassword, id }));
      track(events.newPasswordPage.form.submit);
    }
  };

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ textTransform: "none", mb: "24px", fontSize: "40px" }}
      >
        {t("recovery.title")}
      </Typography>

      {!id && (
        <Typography variant="body2" sx={{ mb: "60px", fontSize: "14px" }}>
          {t("recovery.description")}
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {!id && (
          <>
            <Controller
              name="userLogin"
              rules={{
                required: { value: true, message: t("common:errors.required") },
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,15}$/,
                  message: t("common:errors.emailFormat"),
                },
              }}
              control={control}
              defaultValue={email}
              render={({ field, fieldState: { error } }) => (
                <Input
                  control={control}
                  error={!!error?.message}
                  helperText={error?.message}
                  inputProps={{
                    type: "email",
                    autoComplete: "username",
                    autoFocus: true,
                  }}
                  fullWidth
                  label={t("fields.email.label")}
                  placeholder={t("fields.email.placeholder")}
                  sx={{ mb: "32px" }}
                  {...field}
                />
              )}
            />
            <Track eventName={events.passwordRecoveryPage.shown} />
          </>
        )}

        {id && (
          <>
            <Controller
              name="newPassword"
              rules={{
                required: { value: true, message: t("common:errors.required") },
              }}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <Input
                  control={control}
                  error={!!error?.message}
                  helperText={error?.message}
                  inputProps={{ type: "password" }}
                  fullWidth
                  label={t("auth:fields.newPassword.label")}
                  placeholder={t("auth:fields.newPassword.placeholder")}
                  sx={{ mb: "32px" }}
                  {...field}
                />
              )}
            />
            <Track eventName={events.newPasswordPage.shown} />
          </>
        )}

        {serverSideError?.message !== "auth.recovery.notFound" && (
          <Button
            className={isLoading ? "loading" : ""}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: "24px" }}
            onClick={handleSubmit(onSubmit)}
          >
            {t("recovery.button")}
          </Button>
        )}

        {serverSideError?.message === "auth.recovery.notFound" && (
          <Button
            fullWidth
            variant="outlined"
            color="white"
            sx={{ mb: "24px" }}
            onClick={() => router.push("/auth/recovery")}
          >
            {t("recovery.anotherLink")}
          </Button>
        )}

        <input type="submit" hidden />
      </form>

      <Button
        fullWidth
        variant="outlined"
        color="white"
        sx={{ mb: "24px" }}
        onClick={() => setIsSupportModalOpen(true)}
      >
        {t("contact")}
      </Button>

      {!id && (
        <Button
          fullWidth
          variant="outlined"
          color="white"
          sx={{ mb: "60px" }}
          component={CustomLink}
          href="/auth/login"
          onClick={() => track(events.passwordRecoveryPage.goBackButton.click)}
        >
          {t("recovery.goBack")}
        </Button>
      )}

      <SupportModal
        title={t("modals:loginSupport.title")}
        text={t("modals:loginSupport.text")}
        isOpen={isSupportModalOpen}
        close={() => setIsSupportModalOpen(false)}
        type="auth"
        userLogin={watch("userLogin") || email}
      />
    </Box>
  );
}
