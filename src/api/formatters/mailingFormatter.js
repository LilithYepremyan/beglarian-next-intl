import { MEDIA_IMAGE_BASE_URL } from "./consts";

export default function mailingFormatter(unformattedData) {
  const {
    description,
    header: title,
    fabricsCount: count,
    fabricOrderBy,
    id,
    isSale,
    isNew,
    media,
  } = unformattedData || {};

  const thumbnails = media.map((x) => {
    const ext = x?.ext ? `.${x?.ext}` : "";

    return `${MEDIA_IMAGE_BASE_URL}/hd/${x.id}.jpg`;
  });

  return {
    id,
    thumbnails,
    description,
    title,
    count,
    fabricOrderBy,
    isSale,
    isNew,
  };
}
