import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Label from "./Label";
import Link from "./CustomLink";
import { colors as palette } from "@/theme";
import { usePathname } from "next/navigation";

const ListItemButton = styled((props) => <MuiListItemButton {...props} />)(
  ({ theme }) => ({
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "23px",
    paddingBottom: "23px",
    width: "100%",
  })
);

const ListItemText = styled((props) => (
  <MuiListItemText
    primaryTypographyProps={{
      sx: { color: props.color, fontSize: "12px", fontWeight: 600 },
    }}
    {...props}
  />
))(({ theme }) => ({
  textTransform: "uppercase",
  margin: 0,
}));

const ListItemTextSecondary = styled((props) => (
  <MuiListItemText
    primaryTypographyProps={{
      sx: {
        fontSize: "12px !important",
        color: palette.darkGrey,
        fontWeight: 400,
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  margin: 0,
  flexGrow: 0,
}));

const ListItemIcon = styled((props) => (
  <MuiListItemIcon sx={{ color: props.color }} {...props} />
))(({ theme }) => ({
  marginRight: "12px",
  minWidth: 0,
  fontSize: "16px",
}));

export default function MenuList(props) {
  const { isLoggedIn, items: menuItems, onClose, sx } = props;

  const pathname = usePathname();

  return (
    <List
      sx={{
        background: palette.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        pt: 0,
        pb: "16px",
        ...sx,
      }}
    >
      {menuItems?.main?.map(
        ({ title, link, icon, color, label, textSecondary, onClick }) => (
          <ListItem
            sx={{ flexDirection: "column", alignContent: "flex-start" }}
            key={`main-${title}`}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={link || null}
              onClick={(e) => {
                if (pathname === link) {
                  e.preventDefault();
                }

                if (onClose) {
                  onClose();
                }

                if (onClick) {
                  onClick();
                }
              }}
            >
              <ListItemIcon color={color}>{icon}</ListItemIcon>
              <ListItemText color={color} primary={title} />
              <ListItemTextSecondary primary={textSecondary} />
              {!!label?.text && (
                <Label sx={{ my: "-3px", ml: "16px" }} {...label} />
              )}
            </ListItemButton>
            <Divider
              sx={{ width: "calc(100% - 48px)" }}
              key={`main-divider-${title}`}
            />
          </ListItem>
        )
      )}
      {menuItems?.sections?.map(({ sectionTitle, items }, sectionIndex) => (
        <div key={sectionIndex}>
          {!!sectionTitle && (
            <ListItem key={`section-title-${sectionTitle}`} disablePadding>
              <Typography
                sx={{
                  paddingLeft: "24px",
                  paddingTop: "24px",
                  paddingBottom: "16px",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "colors.mediumGrey",
                }}
                children={sectionTitle}
              />
            </ListItem>
          )}
          {items.map(
            ({
              title,
              link,
              icon,
              color,
              label,
              textSecondary,
              onClick,
              auth: itemAuth,
            }) => {
              if (itemAuth === "loggedIn" && !isLoggedIn) {
                return;
              }

              if (itemAuth === "anonymous" && isLoggedIn) {
                return;
              }

              return (
                <ListItem key={`${sectionTitle}-${title}`} disablePadding>
                  <ListItemButton
                    sx={{ py: "13px" }}
                    component={Link}
                    to={link || null}
                    onClick={() => {
                      if (onClose) {
                        onClose();
                      }

                      if (onClick) {
                        onClick();
                      }
                    }}
                    passfrom="true"
                  >
                    <ListItemIcon color={color}>{icon}</ListItemIcon>
                    <ListItemText color={color} primary={title} />
                    <ListItemTextSecondary primary={textSecondary} />
                    {!!label?.text && (
                      <Label sx={{ my: "-3px", ml: "16px" }} {...label} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            }
          )}
          {sectionIndex < menuItems.sections.length - 1 && (
            <Divider
              sx={{ my: "10px", width: "calc(100% - 48px)" }}
              key={`d-${sectionTitle}`}
              variant="middle"
            />
          )}
        </div>
      ))}
    </List>
  );
}
