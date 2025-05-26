import { MEDIA_IMAGE_BASE_URL, MEDIA_VIDEO_BASE_URL } from "./consts";
import numberWithSpaces from "@/utils/numberWithSpaces";

export default function fabricFormatter(unformattedData) {
  const {
    article,
    price: { value: price, discount },
    description,
    feature,
    reserved: lengthInCart,
    reservedSum: priceInCart,
    id,
    min: minCount,
    max: maxCount,
    isInWishlist: isLiked,
    media = [],
    tpe: typeOfSelling,
    density,
    width,
    panel,
    composition: compositionUnformatted,
    brand: brandUnformatted,
    types: typeUnformatted,
    purpose: purposeUnformatted,
    weaving: weavingUnformatted,
    stretch: stretchUnformatted,
    color: colorUnformatted,
    countryOfOrigin,
    isSampleInCart,
    sustainability = {},
    isSampleAvailable,
    isNew,
  } = unformattedData;

  const images = media
    .filter((x) => x.tpe === "image")
    .map((x) => {
      const ext = x?.ext ? `.${x?.ext}` : "";

      return `${MEDIA_IMAGE_BASE_URL}/hd/${x.id}.jpg`;
    });

  const videos = media
    .filter((x) => x.tpe === "video")
    .map((x) => {
      const ext = x?.ext ? `.${x?.ext}` : "";

      return `${MEDIA_VIDEO_BASE_URL}/thumbnail/${x.id}.jpg`;
    });

  const thumbnails = media
    .filter((x) => x.tpe === "image")
    .map((x) => {
      const ext = x?.ext ? `.${x?.ext}` : "";

      return `${MEDIA_IMAGE_BASE_URL}/hd/${x.id}.jpg`; //TODO
    });

  const videoThumbnails = media
    .filter((x) => x.tpe === "video")
    .map((x) => {
      const ext = x?.ext ? `.jpg` : "";

      return `${MEDIA_VIDEO_BASE_URL}/thumbnail/${x.id}.jpg`; // TODO
    });

  const composition = compositionUnformatted.map((x) => ({
    material: x.code,
    materialFull: x.name,
    percent: x.value,
    tpe: x.tpe,
    id: x.id,
  }));

  const brand = brandUnformatted?.name || null;

  const type =
    typeUnformatted?.length > 0 ? typeUnformatted.map((x) => x.name) : null;
  const purpose =
    purposeUnformatted?.length > 0
      ? purposeUnformatted.map((x) => x.name)
      : null;
  const weaving =
    weavingUnformatted?.length > 0
      ? weavingUnformatted.map((x) => x.name)
      : null;
  const stretch =
    stretchUnformatted?.length > 0
      ? stretchUnformatted.map((x) => x.name)
      : null;
  const color =
    colorUnformatted?.length > 0 ? colorUnformatted.map((x) => x.name) : null;

  const sale = discount
    ? { oldPrice: discount.price, percent: discount.percent }
    : null;
  const country = countryOfOrigin?.name || null;

  if (sustainability?.water) {
    sustainability.water = numberWithSpaces(sustainability.water);
  }

  return {
    id,
    feature,
    minCount,
    maxCount,
    typeOfSelling,
    lengthInCart,
    priceInCart,
    article,
    description,
    isLiked,
    images,
    videos,
    videoThumbnails,
    thumbnails,
    price,
    sale,
    isSampleInCart,
    isSampleAvailable,
    sustainability,
    brand,
    isNew,
    properties: {
      composition,
      density,
      country,
      type,
      width,
      panel,
      purpose,
      weaving,
      stretch,
      color,
    },
  };
}
