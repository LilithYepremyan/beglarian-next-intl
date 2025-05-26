import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { useState } from "react";

import FabricFilters from "./FabricFilters";
import FabricSort from "./FabricSort";
import IconButton from "./IconButton";
import Input from "./Input";
import CloseIcon from "@/icons/CloseIcon";
import FilterIcon from "@/icons/FilterIcon";
import { events, Track } from "@/metrics";
import delayCallback from "@/utils/delayCallback";
import { useSearchParams } from "next/navigation";
import { HEADERHEIGHT } from "@/theme";
import { useLocale, useTranslations } from "next-intl";

const filters = {
  article: [],
  availableFrom: [],
  availableTo: [],
  priceFrom: [],
  priceTo: [],
  densityFrom: [],
  densityTo: [],
  promoOnly: [],
  showSold: [],
  brand: [],
  purpose: [],
  feature: [],
  composition: [],
  weaving: [],
  color: [],
  type: [],
  stretch: [],
};

export default function FabricSearch(props) {
  const tCommon = useTranslations("common");
  const currentLang = useLocale();
  console.log(currentLang, "current lang");

  const { searchParams, setSearchParams } = useSearchParams();

  const {
    isFilterOpen: isFilterOpenFromProps,
    setIsFilterOpen: setIsFilterOpenFromProps,
    optionFilters,
    initialFilterValues,
    onFiltersChange,
    sorts,
    onSortChange,
    currentSortId,
    setNeedFiltersReset,
    needFiltersReset,
    fabricsTotal,
    window,
    sx,
    onSearchStringChange,
    isLoading,
  } = props;

  const [localSearchString, setLocalSearchString] = useState("");

  const canSearch =
    onSearchStringChange &&
    (currentLang === "en" || currentLang === "ru") &&
    (process.env.MODE === "development" || process.env.MODE === "test");

    

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filtersCount = _.reduce(
    initialFilterValues,
    (p, c) => p + (c.length || c > 0 ? 1 : 0),
    0
  );

  const isControlledComponent = isFilterOpenFromProps !== undefined;

  const toggleFilter = () => {
    const isOpen = isControlledComponent ? isFilterOpenFromProps : isFilterOpen;

    if (isControlledComponent) {
      setIsFilterOpenFromProps(!isOpen);
    } else {
      setIsFilterOpen(!isOpen);
    }

    setSearchParams(searchParams, { replace: true });
  };
  console.log("helllool")

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        ...sx,
      }}
    >
      {optionFilters && (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mb: "0px",
              alignItems: "center",
              backgroundColor: "colors.white",
              borderRadius: "8px",
              p: "16px",
              gap: "16px",
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },
            }}
          >
            {!!canSearch && (
              <Input
                inputProps={{ autoComplete: "off" }}
                placeholder={tCommon("search.inputPlaceholder")}
                value={localSearchString}
                onChange={(event) => {
                  const { value } = event.target;

                  setLocalSearchString(value);

                  if (canSearch) {
                    delayCallback(() => {
                      onSearchStringChange(value);
                    }, 500);
                  }
                }}
                sx={{ width: "100%" }}
              />
            )}
            <Button
              color="secondary"
              startIcon={<FilterIcon />}
              variant="contained"
              onClick={() => toggleFilter()}
              sx={{ flexShrink: 0 }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {tCommon("search.showFilters")}
              </Typography>
              {!!filtersCount && (
                <Box
                  sx={{
                    backgroundColor: "colors.red",
                    ml: "8px",
                    color: "colors.white",
                    borderRadius: "50%",
                    width: "20px",
                    display: "flex",
                    height: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {filtersCount}
                </Box>
              )}
            </Button>
            {sorts && (
              <FabricSort
                sorts={sorts}
                onSortChange={onSortChange}
                currentSortId={currentSortId}
              />
            )}
          </Box>

          <Drawer
            container={container}
            ModalProps={{
              keepMounted: true,
            }}
            open={isControlledComponent ? isFilterOpenFromProps : isFilterOpen}
            onClose={() => toggleFilter()}
            variant="temporary"
            sx={{
              top: `${HEADERHEIGHT}px`,
              "& .MuiBackdrop-root": {
                top: `${HEADERHEIGHT}px`,
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                px: {
                  xs: "16px",
                  sm: "32px",
                },
                // pb: '96px',
                pt: {
                  xs: "16px",
                  sm: "32px",
                },
                width: {
                  xs: "310px",
                  sm: "380px",
                },
                position: "relative",
              },
            }}
          >
            <IconButton
              icon={CloseIcon}
              onClick={() => toggleFilter()}
              variant="contained"
              color="secondary"
              sx={{
                zIndex: 16,
                top: "16px",
                right: "16px",
                position: "absolute",
                borderRadius: "50%",
                p: 1,
                minWidth: 0,
              }}
            />
            <FabricFilters
              isLoading={isLoading}
              fabricsTotal={fabricsTotal}
              optionFilters={optionFilters}
              initialFilterValues={initialFilterValues}
              onFiltersChange={onFiltersChange}
              setNeedFiltersReset={setNeedFiltersReset}
              needFiltersReset={needFiltersReset}
            />

            <Box
              sx={{
                py: "16px",
                mt: "16px",
                borderTop: "1px solid",
                borderTopColor: "colors.lightGrey",
              }}
            >
              <Button
                className={isLoading ? "loading" : ""}
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => toggleFilter()}
              >
                {tCommon("search.show")}&nbsp;({fabricsTotal}&nbsp;{tCommon("search.items")}
                )
              </Button>
            </Box>

            {!!(isFilterOpen || isFilterOpenFromProps) && (
              <Track eventName={events.filters.shown} />
            )}
          </Drawer>
        </>
      )}
      {!optionFilters && (
        <Box
          sx={{
            height: "80px",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
          />
        </Box>
      )}
    </Box>
  );
}

export { FabricSearch, filters };
