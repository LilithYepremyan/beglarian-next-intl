import { MEDIA_IMAGE_BASE_URL } from './consts';

export default function cartFormatter(unformattedData) {
  const {
    fabricId: id,
    media: { id: imageId, ext } = {},
    cuts: unformattedCuts,
    article,
    sum,
    requestedSum,
    fabricMin: min,
    fabricMax: max,
    length,
    requestedLength,
    reservation,
    isSample,
  } = unformattedData;

  const cuts =
    unformattedCuts?.map(x => ({
      title: x.description,
      length: x.length,
      oldLength: x.requestedLength,
    })) || [];

  const extension = ext ? `.${ext}` : '';

  const thumbnail = imageId && `${MEDIA_IMAGE_BASE_URL}/thumbnail/${imageId}${extension}`;

  return {
    price: sum,
    length,
    oldLength: requestedLength,
    oldPrice: requestedSum,
    thumbnail,
    reserveTimeLeftSeconds: reservation,
    article,
    cuts,
    id,
    min,
    max,
    isSample,
  };
}
