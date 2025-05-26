import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";


import FabricModal from "./FabricModal";
import IconButton from "./IconButton";
import Label from "./Label";
import LengthInput from "./LengthInput";
import CustomLink from "./CustomLink";
import LoginRegisterModal from "./LoginRegisterModal";
import MaterialLabel from "./MaterialLabel";
import Note from "./Note";
import Price from "./Price";
import Slider from "./Slider";

import CartIconEmpty from "@/icons/CartIconEmpty";
import CartIconFull from "@/icons/CartIconFull";
import CO2Icon from "@/icons/CO2Icon";
import CopyIcon from "@/icons/CopyIcon";
import LikeIcon from "@/icons/LikeIcon";
import LikeIconActive from "@/icons/LikeIconActive";
import MagnifierIcon from "@/icons/MagnifierIcon";
import { marketingEvents, trackMarketingEvent } from "@/marketing";
import { events, track } from "@/metrics";
import pluralize from "@/utils/pluralize";
import { useLocale, useTranslations } from "next-intl";

const ListItem = styled((props) => <MuiListItem {...props} />)(({ theme }) => ({
  padding: "8px 0 0 0",
  alignItems: "flex-start",
}));

const ListItemTextLeft = styled((props) => <Typography {...props} />)(
  ({ theme }) => ({
    width: "107px",
    flexGrow: 0,
    flexShrink: 0,
    color: theme.palette.text.secondary,
  })
);

const ListItemTextRight = styled((props) => <Typography {...props} />)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    whiteSpace: "break-spaces",
    fontWeight: 700,
  })
);

export default function FabricCard(props) {
  const {
    article,
    brand,
    price,
    isNew,
    isLiked,
    lengthInCart,
    isSampleInCart = false,
    isSampleAvailable,
    priceInCart,
    sale,
    properties,
    sustainability: { co2, ch4, water },
    feature,
    description,
    maxCount,
    minCount,
    videos = [],
    images = [],
    thumbnails = [],
    videoThumbnails,
    isUnAuth,
    id,
    cartAction,
    wishlistAction,
    openCO2Modal,
    isLoading,
  } = props;

  const {
    composition,
    density,
    type,
    width,
    panel,
    purpose,
    weaving,
    stretch,
    color,
    country,
  } = properties;

  const tFabric = useTranslations("fabric");
  const tCommon = useTranslations("common");
  const currentLang = useLocale();

  const [isFabricModalOpen, setIsFabricModalOpen] = useState(false);
  const [isSample, setIsSample] = useState(isSampleInCart);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [length, setLength] = useState(
    lengthInCart || Math.max(Math.min(10, maxCount), minCount)
  );
  const [fabricLink, setFabricLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setFabricLink(
        `${origin}${process.env.NEXT_PUBLIC_PUBLIC_PATH}fabrics/${id}?lang=${currentLang}`
      );
    }
  }, [id, currentLang]);

  const isSold = maxCount === 0;

  let available = `${maxCount} ${tCommon("units.metersShort")}`;

  if (isSold) {
    available = tFabric("soldOut");
  }

  const isError = length < minCount || length > maxCount;
  const isChanged = lengthInCart !== length;

  // const fabricLink = `${window.location.origin}${process.env.NEXT_PUBLIC_PUBLIC_PATH}fabrics/${id}?lang=${currentLang}`;

  return (
    <Card sx={{ minWidth: "300px", width: "100%" }}>
      <CardMedia
        className="cardMedia"
        sx={{ height: 280, position: "relative", cursor: "pointer" }}
        onClick={() => setIsFabricModalOpen(true)}
      >
        <Slider
          images={thumbnails}
          videos={videos}
          videoThumbnails={videoThumbnails}
          controls={true}
          setCurrent={setCurrentImageIndex}
          onChange={() => {
            track(events.fabric.slider.changed);
          }}
        />
        {isSold && (
          <Box
            sx={{
              ".cardMedia:hover &": {
                transition: "opacity ease-in 200ms",
                opacity: 0,
              },
              pointerEvents: "none",
              position: "absolute",
              bottom: "0",
              left: "0",
              top: "0",
              right: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity ease-in 200ms",
              backgroundColor: "colors.almostBlackTransparent",

              "& .MuiTypography-root": {
                fontWeight: 600,
                color: "colors.white",
                fontSize: "28px",
              },
            }}
          >
            {isSold && <Typography>{tFabric("soldOut")}</Typography>}
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: "16px",
            left: "16px",
            textTransform: "uppercase",
          }}
        >
          {!!isNew && <Label text={tFabric("new")} variant="promotion" />}
          {!!sale && <Label text={tFabric("sale")} variant="sale" />}
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "16px",
            left: "16px",
            gap: "8px",
            maxWidth: "calc(100% - 140px)",
            flexWrap: "wrap",
          }}
        >
          {!!feature &&
            feature.map(
              (x, i) =>
                !!x?.name && <Label key={i} text={x?.name} variant="tag" />
            )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "16px",
            right: "16px",
            height: "32px",
            width: "32px",
            backgroundColor: "colors.lightGrey",
            borderRadius: "50%",
          }}
        >
          <MagnifierIcon sx={{ fontSize: "16px" }} />
        </Box>
      </CardMedia>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: "16px",
          }}
        >
          <CustomLink
            sx={{
              overflow: "hidden",
              maxWidth: "calc(100% - 96px)",
              textDecoration: "none",
            }}
            href={fabricLink}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "18px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {brand || article}
            </Typography>
            {!!brand && <Typography variant="body2">{article}</Typography>}
          </CustomLink>
          {!isSold && <Price price={price} sale={sale} />}
        </Box>
        <Divider />
        <Box
          sx={{
            transition: "max-height 0.5s ease",
            overflow: "hidden",
            maxHeight: isCollapsed ? "98px" : "500px",
          }}
        >
          <List
            sx={{
              boxSizing: "content-box",
            }}
          >
            {!!composition?.length && (
              <ListItem sx={{ mb: "-4px" }}>
                <ListItemTextLeft>{tFabric("composition")}</ListItemTextLeft>
                <ListItemTextRight sx={{ maxWidth: "200px" }} component={"div"}>
                  {composition.map(
                    (x, i) =>
                      (!isCollapsed || i < 3) && (
                        <MaterialLabel key={i} {...x} />
                      )
                  )}
                </ListItemTextRight>
              </ListItem>
            )}
            {!!available && (
              <ListItem>
                <ListItemTextLeft>{tFabric("available")}</ListItemTextLeft>
                <ListItemTextRight>{available}</ListItemTextRight>
              </ListItem>
            )}
            {!!density && (
              <ListItem>
                <ListItemTextLeft>{tFabric("density")}</ListItemTextLeft>
                <ListItemTextRight>{`${density}\xa0${tCommon(
                  "units.gramsPerMeter"
                )}`}</ListItemTextRight>
              </ListItem>
            )}
            {!!country && (
              <ListItem>
                <ListItemTextLeft>{tFabric("country")}</ListItemTextLeft>
                <ListItemTextRight>{country}</ListItemTextRight>
              </ListItem>
            )}

            {!!type && (
              <ListItem>
                <ListItemTextLeft>{tFabric("type")}</ListItemTextLeft>
                <ListItemTextRight>{type.join(", ")}</ListItemTextRight>
              </ListItem>
            )}
            {!!width && (
              <ListItem>
                <ListItemTextLeft>{tFabric("width")}</ListItemTextLeft>
                <ListItemTextRight>{`${width}\xa0${tCommon(
                  "units.centimeters"
                )}`}</ListItemTextRight>
              </ListItem>
            )}
            {!!panel && (
              <ListItem>
                <ListItemTextLeft>{tFabric("panel")}</ListItemTextLeft>
                <ListItemTextRight>{`${panel}\xa0${tCommon(
                  "units.centimeters"
                )}`}</ListItemTextRight>
              </ListItem>
            )}
            {!!purpose && (
              <ListItem>
                <ListItemTextLeft>{tFabric("purpose")}</ListItemTextLeft>
                <ListItemTextRight>{purpose.join(", ")}</ListItemTextRight>
              </ListItem>
            )}
            {!!weaving && (
              <ListItem>
                <ListItemTextLeft>{tFabric("weaving")}</ListItemTextLeft>
                <ListItemTextRight>{weaving.join(", ")}</ListItemTextRight>
              </ListItem>
            )}
            {!!stretch && (
              <ListItem>
                <ListItemTextLeft>{tFabric("stretch")}</ListItemTextLeft>
                <ListItemTextRight>{stretch}</ListItemTextRight>
              </ListItem>
            )}
            {!!color && (
              <ListItem>
                <ListItemTextLeft>{tFabric("color")}</ListItemTextLeft>
                <ListItemTextRight>{color.join("\n")}</ListItemTextRight>
              </ListItem>
            )}
          </List>

          {!!description && (
            <Box sx={{ my: "16px" }}>
              <Typography
                sx={{ fontWeight: "bold", mb: "8px", userSelect: "none" }}
                variant="body1"
              >
                {tFabric("description")}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: "8px", mb: "16px" }}>
          <Button
            onClick={() => {
              setIsCollapsed(!isCollapsed);

              if (isCollapsed) {
                track(events.fabric.details.expand);
              } else {
                track(events.fabric.details.collapse);
              }
            }}
            variant="contained"
            color="secondary"
            fullWidth
          >
            {isCollapsed
              ? tFabric("buttons.details")
              : tFabric("buttons.collapse")}
          </Button>

          <IconButton
            variant="contained"
            color={isLiked ? "error" : "secondary"}
            icon={isLiked ? LikeIconActive : LikeIcon}
            onClick={() => {
              if (isLiked) {
                track(events.fabric.like.unset);
              } else {
                track(events.fabric.like.set);
              }

              if (isUnAuth) {
                setIsLoginRegisterModalOpen(true);
              } else {
                wishlistAction(id, !isLiked);
              }
            }}
          />
        </Box>
        {/* Ткань не распродана */}
        {!isSold && (
          <>
            {/* Ткань не распродана и не в корзине ни как ткань ни
                        как образец: отображаем переключатель образца */}

            {!lengthInCart && !isSampleInCart && !!isSampleAvailable && (
              <FormControlLabel
                sx={{ mb: "16px" }}
                control={
                  <Switch
                    checked={isSample}
                    onChange={() => {
                      track(events.fabric.toggleSample, {
                        isSample: !isSample,
                      });

                      setIsSample(!isSample);
                    }}
                  />
                }
                label={tFabric("orderSample")}
              />
            )}

            {/* Ввод длины, отображаем если не образец */}

            {!isSample && !isSampleInCart && (
              <LengthInput
                length={length}
                setLength={setLength}
                max={maxCount}
                min={minCount}
                sx={{
                  mb: "16px",
                }}
                isError={isError}
                onMinus={() => {
                  track(events.fabric.lengthPicker.minus);
                }}
                onPlus={() => {
                  track(events.fabric.lengthPicker.plus);
                }}
              />
            )}

            {/* Ткань есть в корзине, длина не менялась */}
            {!!lengthInCart && !isChanged && (
              <Button
                disabled={isError}
                color={"success"}
                variant="contained"
                startIcon={<CartIconFull sx={{ color: "colors.white" }} />}
                fullWidth
                component={CustomLink}
                onClick={() => {
                  track(events.fabric.goToCart);
                }}
                href={"/cart"}
              >
                {tFabric("buttons.inCart")}
              </Button>
            )}

            {/* Образец в корзине */}
            {!!isSampleInCart && (
              <Button
                disabled={isError}
                color={"success"}
                variant="contained"
                startIcon={<CartIconFull sx={{ color: "colors.white" }} />}
                fullWidth
                component={CustomLink}
                onClick={() => {
                  track(events.fabric.goToCart);
                }}
                href={"/cart"}
              >
                {tFabric("buttons.sampleInCart")}
              </Button>
            )}

            {/* Ткань не распродана, в корзине как ткань и изменена длина */}
            {!!lengthInCart && !!isChanged && (
              <Button
                className={isLoading ? "loading" : ""}
                disabled={isError}
                color={"success"}
                variant="contained"
                startIcon={<CartIconFull sx={{ color: "colors.white" }} />}
                fullWidth
                onClick={() => {
                  track(events.fabric.saveChanges);

                  cartAction(id, length);
                }}
              >
                {tFabric("buttons.save")}
              </Button>
            )}

            {/* Ткань не распродана, не в корзине ни как образец, ни как ткань */}
            {!lengthInCart && !isSampleInCart && (
              <Button
                className={isLoading ? "loading" : ""}
                disabled={isError}
                color={"primary"}
                variant="contained"
                startIcon={<CartIconEmpty sx={{ color: "colors.white" }} />}
                fullWidth
                onClick={() => {
                  track(events.fabric.addToCart, { isSample });
                  trackMarketingEvent(marketingEvents.cart.add);

                  if (isUnAuth) {
                    setIsLoginRegisterModalOpen(true);
                  } else {
                    cartAction(id, isSample ? 0 : length);
                  }
                }}
              >
                {tFabric("buttons.add")}
              </Button>
            )}

            {!!lengthInCart && (
              <Note
                variant="success"
                centered
                sx={{ mt: "16px", userSelect: "none" }}
              >
                {tFabric("inYourCart")}&nbsp;{lengthInCart}&nbsp;
                {pluralize(lengthInCart, tCommon("units.meters"))}&nbsp;(
                {priceInCart}&nbsp;
                {tCommon("units.currency")})
              </Note>
            )}

            {!!co2 && (
              <Note
                variant="info"
                icon
                CustomIcon={CO2Icon}
                sx={{ mt: "16px", userSelect: "none" }}
              >
                {ch4
                  ? tFabric("co2disclaimer", { co2, ch4, water })
                  : tFabric("co2disclaimerShort", { co2, water })}
                {". "}

                {/* <Trans
                  id={ch4 ? "co2disclaimer" : "co2disclaimerShort"}
                  values={{ co2, ch4, water }}
                  components={[<strong />]}
                />{" "} */}

                {/* {ch4 ? (
                  <Trans
                    id="co2disclaimer"
                    values={{ co2, ch4, water }}
                    components={[<strong />, <strong />, <strong />]}
                  />
                ) : (
                  <Trans
                    id="co2disclaimerShort"
                    values={{ co2, water }}
                    components={[<strong />, <strong />]}
                  />
                )}
                {". "} */}

                <CustomLink
                  sx={{ mt: "4px" }}
                  onClick={(e) => {
                    openCO2Modal();
                    e.preventDefault();
                  }}
                >
                  {tCommon("links.moreInfo")}
                </CustomLink>
              </Note>
            )}
          </>
        )}

        <Box
          sx={{
            transition: "max-height 0.5s ease",
            overflow: "hidden",
            height: "auto",
            maxHeight: isCollapsed ? "0px" : "500px",
          }}
        >
          <Button
            sx={{ mt: "16px" }}
            startIcon={<CopyIcon />}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              track(events.fabric.copyLink);

              navigator.clipboard.writeText(fabricLink);
            }}
          >
            {tFabric("buttons.copyLink")}
          </Button>
        </Box>
      </CardContent>

      <LoginRegisterModal
        isOpen={isLoginRegisterModalOpen}
        close={() => setIsLoginRegisterModalOpen(false)}
      />

      <FabricModal
        article={article}
        isOpen={isFabricModalOpen}
        close={() => setIsFabricModalOpen(false)}
        thumbnails={thumbnails}
        images={images}
        videos={videos}
        videoThumbnails={videoThumbnails}
        initial={currentImageIndex}
      />
    </Card>
  );
}
