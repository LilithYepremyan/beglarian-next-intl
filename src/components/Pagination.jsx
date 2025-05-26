import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import IconButton from "./IconButton";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import { events, track } from "@/metrics";
import { useTranslations } from "next-intl";

export default function Pagination(props) {
  const {
    current = 1,
    to,
    handlePageChange,
    itemsPerPage,
    onItemsPerPageChange,
  } = props;

  const  tCommon  = useTranslations("common");

  if (!to) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: "8px",
        justifyContent: itemsPerPage ? "space-between" : "center",
      }}
    >
      {!!itemsPerPage && (
        <Box sx={{ display: { xs: "none", sm: "flex" }, width: "185px" }}></Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          gap: "8px",
          overflow: "auto",
        }}
      >
        <IconButton
          icon={ArrowLeftIcon}
          variant="contained"
          color="white"
          disabled={current <= 1}
          onClick={(event) => {
            event.stopPropagation();
            handlePageChange(current <= 1 ? 1 : current - 1);
          }}
        />
        <Select
          IconComponent={() => null}
          value={current}
          onChange={(event) => {
            event.stopPropagation();
            setTimeout(() => handlePageChange(Number(event.target.value)), 0);
          }}
          input={
            <OutlinedInput
              sx={{
                backgroundColor: "colors.white",
                minWidth: "90px",
                textAlign: "center",
              }}
            />
          }
          inputProps={{ sx: { p: "16.5px 14px !important" } }}
          renderValue={(value) => `${value} ${tCommon("pagination.of")} ${to}`}
        >
          {[...Array(to).keys()].map((x) => (
            <MenuItem key={x} value={x + 1}>
              <Typography>{x + 1}</Typography>
            </MenuItem>
          ))}
        </Select>
        <IconButton
          icon={ArrowRightIcon}
          variant="contained"
          color="white"
          disabled={current >= to}
          onClick={(event) => {
            event.stopPropagation();
            handlePageChange(current >= to ? to : current + 1);
          }}
        />
      </Box>
      {!!itemsPerPage && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Typography sx={{ maxWidth: "40%" }}>
            {tCommon("pagination.itemsPerPage")}:
          </Typography>
          <Select
            value={itemsPerPage}
            onChange={(event) => {
              setTimeout(
                () => onItemsPerPageChange(Number(event.target.value)),
                0
              );

              track(events.pagination.itemsPerPageChange, {
                itemsPerPage: Number(event.target.value),
              });
            }}
            input={
              <OutlinedInput
                sx={{
                  backgroundColor: "colors.white",
                  minWidth: "60px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              />
            }
            renderValue={(x) => x}
            inputProps={{ sx: { py: "16.5px !important" } }}
          >
            {[12, 24, 36].map((x) => (
              <MenuItem key={x} value={x}>
                <Typography>{x}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
}
