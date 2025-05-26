"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarButton from "./BarButton";
import BarCart from "./BarCart";
import Logo from "./Logo";
import MenuList from "./MenuList";
import AccountIcon from "@/icons/AccountIcon";
import CallIcon from "@/icons/CallIcon";
import CartIconFull from "@/icons/CartIconFull";
import CloseIcon from "@/icons/CloseIcon";
import FabricIcon from "@/icons/FabricIcon";
import LikeIcon from "@/icons/LikeIcon";
import ListIcon from "@/icons/ListIcon";
import MagnifierIcon from "@/icons/MagnifierIcon";
import MenuIcon from "@/icons/MenuIcon";
import PayIcon from "@/icons/PayIcon";
import PlusIcon from "@/icons/PlusIcon";
import QuestionIcon from "@/icons/QuestionIcon";
import WarningIcon from "@/icons/WarningIcon";
import { events, track } from "@/metrics";
import { logout } from "@/store/slices/authSlice";
import { setIsFilterOpen } from "@/store/slices/fabricsPageSlice";
import { fetchUser } from "@/store/slices/userSlice";
import { colors as palette } from "@/theme";
import numberWithSpaces from "@/utils/numberWithSpaces";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

function Topbar(props) {
  const tTopBar = useTranslations("topbar");

  const dispatch = useDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const normalizedPath = pathname.replace(`/${locale}`, "") || "/";
  console.log(pathname, "pathname");

  const {
    data: {
      stats: { invoices, cart, wishlist },
      isLoggedIn,
    },
    isLoading,
  } = useSelector((state) => state.user);

  const { isFilterOpen } = useSelector((state) => state.fabricsPage);

  useEffect(() => {
    // dispatch(fetchUser());
    if (typeof window !== "undefined") {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const drawerMenuItemsUnfiltered = {
    main: [
      {
        title: tTopBar("fabrics"),
        link: "/fabrics",
        icon: <MagnifierIcon />,
      },
      {
        title: tTopBar("mailings"),
        label: {
          variant: "promotion",
          text: tTopBar("new"),
        },
        link: "/mailings",
        icon: <FabricIcon />,
      },
      {
        title: tTopBar("wishlist"),
        label: {
          text: wishlist?.count || null,
        },
        icon: <LikeIcon />,
        auth: "loggedIn",
        link: "/wishlist",
      },
      {
        title: tTopBar("faq"),
        link: "/faq",
        icon: <QuestionIcon />,
      },
      {
        title: tTopBar("contacts"),
        link: "/contacts",
        icon: <CallIcon />,
      },
    ],
    sections: [
      {
        sectionTitle: tTopBar("user"),
        auth: "loggedIn",
        items: [
          {
            title: tTopBar("profile"),
            link: "/user",
            user: true,
            icon: <AccountIcon />,
          },
          {
            title: tTopBar("cart"),
            textSecondary: cart?.sum
              ? `${numberWithSpaces(cart?.sum?.toFixed(1))} ${t(
                  "common:units.currency"
                )}`
              : null,
            label: {
              variant: "success",
              text: cart?.count || null,
            },
            icon: <CartIconFull />,
            link: "/cart",
            user: true,
          },
          {
            title: tTopBar("orders"),
            link: "/orders",
            user: true,
            icon: <ListIcon />,
          },
          {
            title: tTopBar("invoices"),
            label: {
              variant: "alert",
              text: invoices?.hasUnpayed ? tTopBar("notPayed") : null,
            },
            link: "/invoices",
            user: true,
            icon: <PayIcon />,
          },
        ],
      },
      {
        auth: "loggedIn",
        items: [
          {
            title: tTopBar("logout"),
            color: palette.red,
            icon: <WarningIcon />,
            onClick: () => {
              dispatch(logout());
            },
          },
        ],
      },
      {
        sectionTitle: tTopBar("user"),
        auth: "anonymous",
        items: [
          {
            title: tTopBar("login"),
            icon: <AccountIcon />,
            link: "/auth/login",
          },
          {
            title: tTopBar("register"),
            icon: <PlusIcon />,
            link: "/auth/register",
          },
        ],
      },
    ],
  };

  const drawerMenuItems = {
    main: drawerMenuItemsUnfiltered.main.filter((item) => {
      const { auth } = item;
      if (auth === "loggedIn" && !isLoggedIn) {
        return;
      }

      if (auth === "anonymous" && isLoggedIn) {
        return;
      }

      return item;
    }),
    sections: drawerMenuItemsUnfiltered.sections.filter((section) => {
      const { auth } = section;
      if (auth === "loggedIn" && !isLoggedIn) {
        return;
      }

      if (auth === "anonymous" && isLoggedIn) {
        return;
      }

      return section;
    }),
  };

  const profileMenuItemsUnfiltered = {
    sections: [
      {
        auth: "loggedIn",
        items: [
          {
            title: tTopBar("profile"),
            link: "/user",
            user: true,
            icon: <AccountIcon />,
          },
          {
            title: tTopBar("orders"),
            link: "/orders",
            user: true,
            icon: <ListIcon />,
          },
          {
            title: tTopBar("invoices"),
            label: {
              variant: "alert",
              text: invoices?.hasUnpayed ? tTopBar("notPayed") : null,
            },
            link: "/invoices",
            user: true,
            icon: <PayIcon />,
          },
        ],
      },

      {
        auth: "anonymous",
        items: [
          {
            title: tTopBar("login"),
            icon: <AccountIcon />,
            link: "/auth/login",
          },
          {
            title: tTopBar("register"),
            icon: <PlusIcon />,
            link: "/auth/register",
          },
        ],
      },

      {
        auth: "loggedIn",
        items: [
          {
            title: tTopBar("logout"),
            color: palette.red,
            icon: <WarningIcon />,
            onClick: () => {
              dispatch(logout());
            },
          },
        ],
      },
    ],
  };

  const profileMenuItems = {
    sections: profileMenuItemsUnfiltered.sections.filter((section) => {
      const { auth } = section;
      if (auth === "loggedIn" && !isLoggedIn) {
        return;
      }

      if (auth === "anonymous" && isLoggedIn) {
        return;
      }

      return section;
    }),
  };

  const { window, headerHeight } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);

    track(events.menu.shown);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isTest = process.env.MODE === "test";

  return (
    <>
      (
      <AppBar
        position="fixed"
        sx={{
          height: headerHeight,
          boxSizing: "border-box",
          boxShadow: "none",
          borderBottom: "none",
          backgroundColor: isTest ? palette.red : palette.almostBlack,
        }}
      >
        <Container maxWidth="xl" sx={{ height: "inherit" }}>
          <Toolbar
            sx={{ justifyContent: "space-between", height: "inherit" }}
            disableGutters
          >
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: "12px" }}>
              <BarButton
                icon={mobileOpen ? CloseIcon : MenuIcon}
                onClick={handleDrawerToggle}
              />
              <Logo />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Logo />
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {drawerMenuItems.main.map(({ title, link, onClick }) => (
                <Link
                  href={link || "#"}
                  passHref
                  key={title}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    key={`h-${title}`}
                    onClick={(e) => {
                      if (pathname === normalizedPath) {
                        e.preventDefault();
                      }

                      if (onClick) {
                        onClick();
                      }
                    }}
                    sx={{
                      mx: 1,
                      display: "block",
                      textAlign: "center",
                      textTransform: "uppercase",
                      color: palette.white,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    }}
                  >
                    {title}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "space-between",
              }}
            >
              {isLoggedIn && <BarCart count={cart?.count || 0} />}

              <Box
                sx={{
                  display: { xs: isLoggedIn ? "none" : "flex", md: "flex" },
                }}
              >
                {!isLoading && (
                  <BarButton
                    text={isLoggedIn ? null : tTopBar("login")}
                    active={Boolean(anchorElUser)}
                    icon={AccountIcon}
                    onClick={handleOpenUserMenu}
                  />
                )}

                <Menu
                  sx={{
                    "& .MuiPaper-root": {
                      position: "relative",
                      borderRadius: " 0 0 16px 16px",
                      top: `${headerHeight}px !important`,
                      overflow: "visible",
                      width: "295px",
                      zIndex: "2000",

                      "&::before": {
                        position: "absolute",
                        top: "-6px",
                        right: {
                          xs: "69px",
                          sm: "76px",
                        },
                        content: '""',
                        width: 0,
                        height: 0,
                        display: "block",
                        borderStyle: "solid",
                        borderWidth: "0 6px 6px 6px",
                        borderColor: "transparent",
                        borderBottomColor: "pal.white",
                        zIndex: "2000",
                      },
                    },
                    "& .MuiList-root": {
                      borderRadius: " 0 0 16px 16px",
                      pb: "4px",
                    },
                  }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuList
                    items={profileMenuItems}
                    onClose={handleCloseUserMenu}
                  />
                </Menu>
              </Box>

              <BarButton
                icon={MagnifierIcon}
                onClick={() => {
                  dispatch(setIsFilterOpen(!isFilterOpen));

                  if (pathname !== "/fabrics") {
                    router.push("/fabrics");
                  }
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            top: `${headerHeight}px`,
            zIndex: 3000,
            display: { xs: "block", md: "none" },
            "& .MuiBackdrop-root": {
              top: `${headerHeight}px`,
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 370,
              position: "relative",
            },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              height: "100%",
            }}
          >
            <MenuList items={drawerMenuItems} />
          </Box>
        </Drawer>
      </Box>
      )
    </>
  );
}

export default Topbar;
