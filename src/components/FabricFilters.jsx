import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useEffect, useState } from "react";

import Input from "./Input";
import RangeInput from "./RangeInput";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import delayCallback from "@/utils/delayCallback";
import { useLocale, useTranslations } from "next-intl";

const FlexItem = styled((props) => <Box {...props} />)(({ theme }) => ({
  minWidth: "215px",
  width: "100%",
  maxWidth: "100%",
}));

export default function FabricFilters(props) {
  const {
    optionFilters: optionFiltersFromProps,
    initialFilterValues,
    setNeedFiltersReset,
    needFiltersReset,
    onFiltersChange,
    fabricsTotal,
    isLoading,
    sx,
  } = props;

  const tCommon = useTranslations("common");
  const tFabric = useTranslations("fabric");
  const currentLang = useLocale();

  const [openedFilter, setOpenedFilter] = useState(0);
  const [isDuringDelay, setIsDuringDelay] = useState(false);

  const [article, setArticle] = useState(initialFilterValues?.article || "");
  const [availableFrom, setAvailableFrom] = useState(
    initialFilterValues?.availableFrom || ""
  );
  const [availableTo, setAvailableTo] = useState(
    initialFilterValues?.availableTo || ""
  );
  const [priceFrom, setPriceFrom] = useState(
    initialFilterValues?.priceFrom || ""
  );
  const [priceTo, setPriceTo] = useState(initialFilterValues?.priceTo || "");
  const [densityFrom, setDensityFrom] = useState(
    initialFilterValues?.densityFrom || ""
  );
  const [densityTo, setDensityTo] = useState(
    initialFilterValues?.densityTo || ""
  );
  const [showSold, setShowSold] = useState(initialFilterValues?.showSold || "");
  const [promoOnly, setPromoOnly] = useState(
    initialFilterValues?.promoOnly || ""
  );

  const optionFilters = {
    brand: {},
    purpose: {},
    feature: {},
    composition: {},
    weaving: {},
    color: {},
    type: {},
    stretch: {},
    ...optionFiltersFromProps,
  };

  let optionFiltersWithState = {};

  Object.keys(optionFilters).forEach((key) => {
    const [value, setValue] = useState(initialFilterValues[key] || []);

    optionFiltersWithState = {
      ...optionFiltersWithState,

      [key]: {
        ...optionFilters[key],
        value,
        setValue,
      },
    };
  });

  const resultingFilters = Object.keys(optionFiltersWithState).reduce(
    (acc, x) => ({ ...acc, [x]: optionFiltersWithState[x]?.value }),
    {}
  );

  const resultingFiltersAsArrayOfStrings = Object.keys(resultingFilters).map(
    (x) => resultingFilters[x]?.toString()
  );

  useEffect(() => {
    const resultingFiltersAsStrings = Object.keys(
      optionFiltersWithState
    ).reduce((acc, x) => {
      const value = optionFiltersWithState[x]?.value;

      return { ...acc, [x]: value || [] };
    }, {});

    const filtersToUpdate = {
      ...{ article: article || [] },
      ...{ availableFrom: availableFrom || [] },
      ...{ availableTo: availableTo || [] },
      ...{ priceFrom: priceFrom || [] },
      ...{ priceTo: priceTo || [] },
      ...{ densityFrom: densityFrom || [] },
      ...{ densityTo: densityTo || [] },
      ...{ showSold: showSold || [] },
      ...{ promoOnly: promoOnly || [] },
      ...resultingFiltersAsStrings,
    };

    if (!_.isEqual(filtersToUpdate, initialFilterValues)) {
      setIsDuringDelay(true);

      delayCallback(() => {
        setIsDuringDelay(false);
        onFiltersChange(filtersToUpdate);
      }, 500);
    }
  }, [
    article,
    availableFrom,
    availableTo,
    priceFrom,
    priceTo,
    densityFrom,
    densityTo,
    showSold,
    promoOnly,
    ...resultingFiltersAsArrayOfStrings,
  ]);

  const resetFilters = () => {
    _.forEach(optionFiltersWithState, (x) => x.setValue([]));
    setArticle([]);
    setAvailableFrom([]);
    setAvailableTo([]);
    setPriceFrom([]);
    setPriceTo([]);
    setDensityFrom([]);
    setDensityTo([]);
    setShowSold([]);
    setPromoOnly([]);
    setNeedFiltersReset(false);
  };

  useEffect(() => {
    if (needFiltersReset) {
      resetFilters();
    }
  }, [needFiltersReset]);

  return (
    <Box
      sx={{
        display: "block",
        justifyContent: "space-between",
        p: 0,
        alignItems: "center",
        backgroundColor: "colors.white",
        borderRadius: "8px",
        overflow: "scroll",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          mb: "24px",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "bold", lineHeight: 1 }}
          >
            {tCommon("search.foundTitle")}:
          </Typography>
          <Typography sx={{ color: "colors.darkGrey", lineHeight: 1 }}>
            {fabricsTotal}&nbsp;{tCommon("search.items")}
          </Typography>
        </Box>
        <Link
          sx={{
            fontSize: "12px",
            color: "colors.brightBlue",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: "bold",

            "&:hover": {
              cursor: "pointer",
              color: "colors.almostBlack",
            },
          }}
          onClick={() => resetFilters()}
        >
          {tCommon("search.clear")}
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          minWidth: "100%",
          flexDirection: "column",
          height: "auto",
          flexWrap: "wrap",
          gap: "16px",
          flexGrow: 0,
          flexBasis: 0,
          alignItems: "space-between",
          justifyContent: "flex-start",
        }}
      >
        <FlexItem>
          <Input
            fullWidth
            placeholder={tFabric("article")}
            autoComplete="off"
            value={article}
            onChange={(event) => {
              const { value } = event.target;

              setArticle(value);
            }}
          />
        </FlexItem>

        <FlexItem>
          <RangeInput
            from={availableFrom}
            placeholderFrom={tFabric("availableFrom")}
            setFrom={setAvailableFrom}
            to={availableTo}
            placeholderTo={tFabric("availableTo")}
            setTo={setAvailableTo}
            units={tCommon("units.metersShort")}
          />
        </FlexItem>
        {currentLang !== "cn" && (
          <FlexItem>
            <RangeInput
              from={priceFrom}
              placeholderFrom={tFabric("priceFrom")}
              setFrom={setPriceFrom}
              to={priceTo}
              placeholderTo={tFabric("priceTo")}
              setTo={setPriceTo}
              units={tCommon("units.currency")}
            />
          </FlexItem>
        )}
        <FlexItem>
          <RangeInput
            from={densityFrom}
            placeholderFrom={tFabric("densityFrom")}
            setFrom={setDensityFrom}
            to={densityTo}
            placeholderTo={tFabric("densityTo")}
            setTo={setDensityTo}
            units={tCommon("units.gramsPerMeter")}
          />
        </FlexItem>

        {Object.keys(optionFiltersWithState).map((key) => {
          const filter = optionFiltersWithState[key];

          if (!filter?.title) {
            return;
          }

          return (
            <FlexItem key={key}>
              <Select
                size="small"
                value={filter.value}
                open={openedFilter === key}
                onClose={() => setOpenedFilter(0)}
                onOpen={() => setOpenedFilter(key)}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  filter.setValue(value);
                }}
                multiple
                MenuProps={{
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  sx: {
                    maxHeight: "570px",
                  },
                }}
                IconComponent={(iconProps) => (
                  <ArrowDownIcon
                    {...iconProps}
                    sx={{
                      fontSize: "16px",
                      right: "12px !important",
                    }}
                  />
                )}
                input={<OutlinedInput />}
                renderValue={(value) =>
                  value
                    .map(
                      (id) =>
                        filter.options.find((option) => option.id === id)?.title
                    )
                    .join(`, `)
                }
                fullWidth
                sx={{
                  "& .MuiSelect-select .notranslate::after": {
                    content: `"${filter.title}"`,
                    opacity: 0.42,
                    display:
                      filter?.value?.length > 0 ? "none" : "inline-block",
                  },
                }}
              >
                {filter.options.map((x) => (
                  <MenuItem
                    sx={{
                      height: "48px",
                      display: "flex",
                      flexDirection: "column",
                      py: 0,
                      px: "16px",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                    key={`option-${x.id}`}
                    value={x.id}
                    disabled={
                      isDuringDelay ||
                      isLoading ||
                      (x.count === 0 && !filter.value?.find((y) => y === x.id))
                    }
                  >
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Checkbox
                        checked={
                          !!filter.value?.find((y) => y === x.id) || false
                        }
                      />
                      <Typography sx={{ fontWeight: "bold" }}>
                        {x.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ ml: "auto", fontSize: "12px" }}
                      >
                        {x.count}
                      </Typography>
                    </Box>
                    <Divider
                      sx={{ width: "100%", marginTop: "auto" }}
                      key={`sort-divider-${x.id}`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FlexItem>
          );
        })}

        <FlexItem sx={{ mt: "16px" }}>
          <FormControlLabel
            slotProps={{
              typography: {
                sx: { fontWeight: "bold !important" },
              },
            }}
            label={tFabric("showSold")}
            onChange={() => {
              if (showSold?.[0] === "true") {
                setShowSold("");
              } else {
                setShowSold(["true"]);
              }
            }}
            control={
              <Checkbox sx={{ py: 0 }} checked={showSold?.[0] === "true"} />
            }
          />
        </FlexItem>

        <FlexItem sx={{ mb: "16px" }}>
          <FormControlLabel
            slotProps={{
              typography: {
                sx: { fontWeight: "bold !important" },
              },
            }}
            label={tFabric("promoOnly")}
            onChange={() => {
              if (promoOnly?.[0] === "true") {
                setPromoOnly("");
              } else {
                setPromoOnly(["true"]);
              }
            }}
            control={
              <Checkbox sx={{ py: 0 }} checked={promoOnly?.[0] === "true"} />
            }
          />
        </FlexItem>
      </Box>
    </Box>
  );
}
