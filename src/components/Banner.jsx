"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocale, useTranslations } from "next-intl";

import ChinaB2B from "./banners/ChinaB2B";
import CustomLink from "./CustomLink";

import { events, track, Track } from "@/metrics";
import CloseIcon from "@/icons/CloseIcon";

export default function Banner(props) {
  const { sx, location = "" } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  const locale = useLocale();
  const tBanners = useTranslations("banners");

  const {
    data: { utm },
  } = useSelector((state) => state.utm);

  const UTM_BANNERS = [
    {
      name: "free-samples-0124",
      pages: ["fabrics", "mailings", "mailing", "cart"],
      defaultConfig: {
        count: 1,
        isVisible: true,
      },
    },
  ];

  const STATIC_BANNERS = [
    {
      name: "firstOrder",
      pages: ["register"],
      backgroundImage: "/images/register.jpg",
      defaultConfig: {
        count: 1,
        isVisible: true,
      },
    },
    {
      component: ChinaB2B,
      name: "chinaB2B",
      pages: ["fabrics", "mailings"],
      defaultConfig: {
        count: 2,
        isVisible: true,
      },
    },
  ];

  const campaign = utm?.utmCampaign;

  const banner =
    UTM_BANNERS.find((x) => x.name === campaign && x.pages?.includes(location)) ||
    STATIC_BANNERS.find((x) => x.pages?.includes(location)) ||
    {};

  const { name, defaultConfig, backgroundImage, onClick } = banner;
  const Component = banner.component || null;

  // Безопасное получение перевода
  let header = "";
  let buttonText = "";
  let richText = null;

  try {
    header = tBanners(`${name}.header`);
    buttonText = tBanners(`${name}.buttonText`);
    richText = tBanners.rich(`${name}.text`, {
      br: () => <br />,
      strong: (chunk) => <strong>{chunk}</strong>,
      ul: (chunk) => <ul>{chunk}</ul>,
      li: (chunk) => <li>{chunk}</li>,
    });
  } catch {
    return null;
  }

  const [currentBannerConfig, setCurrentBannerConfig] = useState(defaultConfig);

  const memoizedDefaultConfig = useMemo(() => defaultConfig, [name]);

  useEffect(() => {
    if (!name) return;

    const stored = localStorage.getItem(`bfBanner-${name}`);
    const parsed = stored ? JSON.parse(stored) : memoizedDefaultConfig;

    setCurrentBannerConfig(parsed);
    setIsVisible(parsed.isVisible);
    setConfigLoaded(true);
  }, [name, memoizedDefaultConfig]);

  const onHide = () => {
    const updated = {
      ...currentBannerConfig,
      count: Math.max(0, currentBannerConfig.count - 1),
      isVisible: currentBannerConfig.count > 1,
    };

    localStorage.setItem(`bfBanner-${name}`, JSON.stringify(updated));
    setCurrentBannerConfig(updated);
    setIsVisible(updated.isVisible);
  };

  if (!name || !configLoaded) return null;

  return isVisible ? (
    <>
      {Component ? (
        <Component
          onClose={() => {
            track(events.banner.closeIcon.click, {
              location,
              name,
              countLeft: currentBannerConfig.count - 1,
            });
            onHide();
          }}
          sx={sx}
        />
      ) : (
        <Box
          sx={{
            p: "24px",
            borderRadius: "8px",
            position: "relative",
            background: `
              linear-gradient(0deg, rgba(19, 33, 70, 0.50) 20%, 
              rgba(19, 33, 70, 0.20) 100%), 
              url(${backgroundImage || "/images/defaultBanner.jpg"}), 
              lightgray 80% / cover no-repeat
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: { xs: "flex-start" },
            alignItems: "center",
            ...sx,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: "0px", sm: "8px" },
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                width: "100%",
                fontWeight: "bold",
                textDecoration: "none",
                color: "colors.white",
              }}
            >
              {header}
            </Typography>

            {richText && (
              <Typography sx={{ fontSize: "14px", color: "colors.white", mt: "8px" }}>
                {richText}
              </Typography>
            )}

            {!!buttonText && !!onClick && (
              <Button
                component={CustomLink}
                onClick={() => {
                  track(events.banner.link.click);
                  onClick?.();
                }}
                color="success"
                variant="contained"
                sx={{ mt: "24px", minWidth: "120px" }}
              >
                {buttonText}
              </Button>
            )}
          </Box>
          <CloseIcon
            onClick={() => {
              track(events.banner.closeIcon.click, {
                location,
                name,
                countLeft: currentBannerConfig.count - 1,
              });
              onHide();
            }}
            sx={{
              position: "absolute",
              top: "12px",
              right: "12px",
              color: "colors.white",
              cursor: "pointer",
            }}
          />
        </Box>
      )}
      <Track eventName={events.banner.shown} eventProps={{ location, name }} />
    </>
  ) : null;
}
