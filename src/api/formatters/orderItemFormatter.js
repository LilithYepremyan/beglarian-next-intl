import { MEDIA_IMAGE_BASE_URL } from './consts';

export default function cartFormatter(unformattedData) {
  const { fabricId: id, article, sum: price, brand, length, image, isPayed, isSample } = unformattedData;

  const ext = image?.ext ? `.${image?.ext}` : '';

  const thumbnail = image?.id ? `${MEDIA_IMAGE_BASE_URL}/thumbnail/${image?.id}${ext}` : null;

  return {
    price,
    length,
    thumbnail,
    article,
    isPayed,
    brand,
    id,
    isSample,
  };
}
