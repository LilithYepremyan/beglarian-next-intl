"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Banner from "@/components/Banner";
import Input from "@/components/Input";
import CustomLink from "@/components/CustomLink";
import PhoneInput from "@/components/PhoneInput";
import SupportModal from "@/components/SupportModal";
import { events, track, Track } from "@/metrics";
import {
  fetchCountriesAndActivities,
  register,
  resetAction,
  resetError,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import {  useTranslations } from "next-intl";

function Register() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tModals = useTranslations("modals");
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { isDirty },
  } = useForm({
    shouldFocusError: false,
  });

  const {
    data: { countries, action },
    error: serverSideError,
    isLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCountriesAndActivities());

    return () => {
      dispatch(resetError());
    };
  }, []);

  const onSubmitError = (submitErrors) => {
    Object.keys(submitErrors)?.forEach((x) => {
      track(events.registerPage.form.error, { error: x });
    });
  };

  const onSubmit = ({ userLogin, country, phone, name }) => {
    track(events.registerPage.form.submit);

    dispatch(
      register({
        email: userLogin,
        phone: phone.replace("+", ""),
        country: country.id,
        name,
      })
    );
  };

  useEffect(() => {
    if (action === "login") {
      track(events.registerPage.loginRedirect);

      router.push(`/auth/login?email=${watch("userLogin")}`);
    }

    if (action === "setup") {
      track(events.registerPage.createPasswordRedirect);

      router(`/auth/create`);
    }

    return () => dispatch(resetAction());
  }, [action]);

  useEffect(() => {
    if (serverSideError?.message === "user.register.phoneInputError") {
      setError("phone", {
        type: "custom",
        message: tCommon("errors.serverside.phoneInputError"),
      });

      track(events.registerPage.form.error, { error: "phoneInputError" });
    }

    return () => {
      dispatch(resetError());
    };
  }, [serverSideError?.id]);

  useEffect(() => {
    if (isDirty) {
      track(events.registerPage.form.started);
    }
  }, [isDirty]);

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ textTransform: "none", mb: "24px", fontSize: "40px" }}
      >
        {tAuth("register.title")}
      </Typography>
      <Typography variant="body2" sx={{ mb: "24px", fontSize: "14px" }}>
        {tAuth("register.description")}
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ mb: "60px" }}
        component={CustomLink}
        href={"/auth/login"}
        onClick={() => {
          track(events.registerPage.alreadyHaveAnAccountButton.click);
        }}
      >
        {tAuth("register.already")}
      </Button>

      <Banner  sx={{ mb: "24px", mt: "-24px" }} location="register" />

      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <Controller
          name="name"
          rules={{
            required: { value: true, message: tCommon("errors.required") },
          }}
          control={control}
          defaultValue={""}
          render={({ field, _arg, fieldState: { error } }) => (
            <Input
              required={true}
              control={control}
              error={!!error?.message}
              helperText={error?.message}
              inputProps={{
                autoComplete: "name",
              }}
              fullWidth
              label={tAuth("fields.name.label")}
              placeholder={tAuth("fields.name.placeholder")}
              sx={{ mb: "32px" }}
              {...field}
            />
          )}
        />

        <Controller
          name="userLogin"
          rules={{
            required: { value: true, message: tCommon("errors.required") },
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,15}$/,
              message: tCommon("errors.emailFormat"),
            },
          }}
          control={control}
          defaultValue={""}
          render={({ field, _arg, fieldState: { error } }) => (
            <Input
              required={true}
              control={control}
              error={!!error?.message}
              helperText={error?.message}
              inputProps={{
                type: "email",
                autoComplete: "username",
              }}
              fullWidth
              label={tAuth("fields.email.label")}
              placeholder={tAuth("fields.email.placeholder")}
              sx={{ mb: "32px" }}
              {...field}
            />
          )}
        />

        <Box sx={{ mb: "32px" }}>
          <PhoneInput
            watch={watch}
            setValue={setValue}
            countries={countries}
            countryControl={control}
            phoneControl={control}
          />
        </Box>

        <Button
          fullWidth
          className={isLoading ? "loading" : ""}
          variant="contained"
          color="primary"
          sx={{ mb: "16px" }}
          onClick={handleSubmit(onSubmit, onSubmitError)}
        >
          {tAuth("register.create")}
        </Button>
        <Button
          variant="outlined"
          color="white"
          sx={{ width: "100%", mb: "32px" }}
          onClick={() => setIsSupportModalOpen(true)}
        >
          {tAuth("contact")}
        </Button>
        <Typography variant="body2" sx={{ mb: "24px", fontSize: "12px" }}>
          {tAuth("register.disclaimer")}
        </Typography>
        <input type="submit" hidden />
      </form>

      {isSupportModalOpen && (
        <SupportModal
          title={tModals("loginSupport.title")}
          text={tModals("loginSupport.text")}
          isOpen={true}
          close={() => setIsSupportModalOpen(false)}
          type="auth"
          userLogin={watch("userLogin")}
          userPhone={watch("phone")}
        />
      )}

      <Track eventName={events.registerPage.shown} />
    </Box>
  );
}

export default Register;
