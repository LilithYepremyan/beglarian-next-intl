import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import Input from "./Input";
import { colors } from "@/theme";
import isMobile from "@/utils/isMobile";
import { useLocale, useTranslations } from "next-intl";

export default function BfPhoneInput(props) {
  const { countryControl, phoneControl, countries, setValue, watch } = props;
  const currentLang = useLocale();

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (currentLang === "fr") {
      const france = countries.find((x) => x.code === "FR");

      if (france) {
        setSelectedCountry("fr");
        setValue("country", france);
        setValue("phone", `+${france.phoneCode}`);
      }
    }

    if (currentLang === "cn") {
      const china = countries.find((x) => x.code === "CN");

      if (china) {
        setSelectedCountry("cn");
        setValue("country", china);
        setValue("phone", `+${china.phoneCode}`);
      }
    }
  }, [currentLang, countries]);

  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  return (
    <>
      <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: "8px" }}>
        {tAuth("fields.country.label")}{" "}
        <span style={{ color: colors.red }}>*</span>
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "8px", mb: "8px" }}
      >
        <Controller
          name="country"
          rules={{
            required: { value: true, message: tCommon("errors.required") },
          }}
          control={countryControl}
          defaultValue={null}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl error={!!error?.message}>
              {isMobile() && (
                <>
                  <NativeSelect
                    sx={{ opacity: 0 }}
                    variant="outlined"
                    onChange={(e) => {
                      const {
                        target: { value: selectValue },
                      } = e;
                      const currentCountry = countries.find(
                        (x) => x.name === selectValue
                      );

                      if (currentCountry?.phoneCode) {
                        setValue("country", `+${currentCountry?.id}`);
                        setSelectedCountry(currentCountry?.code?.toLowerCase());
                      }

                      onChange(currentCountry);
                    }}
                  >
                    {countries.map((x) => (
                      <option value={x.name} key={x.name}>
                        {x.name}
                      </option>
                    ))}
                  </NativeSelect>
                  <Input
                    sx={{ marginTop: "-48px", pointerEvents: "none" }}
                    error={!!error?.message}
                    helperText={error?.message}
                    value={`${value?.name || ""}`}
                  />
                </>
              )}
              {!isMobile() && (
                <Autocomplete
                  disableClearable
                  options={countries}
                  PopperComponent={(popperProps) => (
                    <Popper {...popperProps} sx={{ minWidth: "300px" }} />
                  )}
                  autoHighlight
                  filterOptions={(options, state) => {
                    const { inputValue } = state;

                    return options.filter(
                      (x) =>
                        x.phoneCode.startsWith(inputValue) ||
                        x.name
                          .toLowerCase()
                          .startsWith(inputValue.toLowerCase())
                    );
                  }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(optionProps, option) => (
                    <Typography {...optionProps} key={option.name}>
                      {option.name}
                    </Typography>
                  )}
                  renderInput={(params) => (
                    <Input
                      helperText={error?.message}
                      error={!!error?.message}
                      {...params}
                    />
                  )}
                  onChange={(e, data) => {
                    if (data?.phoneCode) {
                      setSelectedCountry(data?.code?.toLowerCase());
                    }

                    onChange(data);
                  }}
                  value={value}
                />
              )}
            </FormControl>
          )}
        />

        <Controller
          name="phone"
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]{7,20}$/,
            },
          }}
          control={phoneControl}
          render={({ field, _arg, fieldState: { error } }) => (
            <Box
              sx={{
                "& .form-control:focus": {
                  border: `1px solid ${
                    error ? colors.red : colors.mediumGrey
                  } !important`,
                  outline: "none",
                },
                "& .form-control:hover": {
                  border: `1px solid ${
                    error ? colors.red : colors.mediumGrey
                  } !important`,
                },
                "& .form-control": {
                  border: `1px solid ${
                    error ? colors.red : colors.lightGrey
                  } !important`,
                  fontWeight: 600,
                  fontSize: "14px",
                  borderRadius: "8px",
                  padding: "14px",
                  width: "100%",
                  color: error ? colors.red : null,
                },
                "& .form-control:disabled": {
                  border: `1px solid ${
                    error ? colors.red : colors.lightGrey
                  } !important`,
                  fontWeight: 400,
                  fontSize: "14px",
                  borderRadius: "8px",
                  padding: "14px",
                  width: "100%",
                  color: error ? colors.red : null,
                },
                "& .form-control:disabled::placeholder": {
                  color: error ? colors.red : null,
                  opacity: { xs: 1, sm: 0.4 },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  mt: "24px",
                  mb: "8px",
                }}
              >
                {tAuth("fields.phone.label")}{" "}
                <span style={{ color: colors.red }}>*</span>
              </Typography>

              <PhoneInput
                {...field}
                specialLabel=""
                value={watch("phone")}
                placeholder={
                  !selectedCountry ? tAuth("fields.phone.placeholder") : ""
                }
                enableLongNumbers={true}
                country={selectedCountry}
                disabled={!selectedCountry}
              />

              <Typography
                variant="body2"
                sx={{
                  mt: "8px",
                  fontSize: "12px",
                  color: error ? "colors.red" : "colors.darkGrey",
                }}
              >
                {tAuth("fields.phone.description")}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </>
  );
}
