import cartItemFormatter from './cartItemFormatter';
import numberWithSpaces from '@/utils/numberWithSpaces';

export default function cartFormatter(unformattedData) {
  const { ordered, updated, notAvailable, summary, samples, minimalOrder, promoCode, promoDiscount } = unformattedData;

  const fabrics = ordered.map(x => cartItemFormatter(x));
  const fabricsChanged = updated.map(x => cartItemFormatter(x));
  const fabricsSold = notAvailable.map(x => cartItemFormatter(x, true));
  const fabricsSamples = samples.map(x => cartItemFormatter(x));

  if (summary?.sustainability?.water) {
    summary.sustainability.water = numberWithSpaces(summary.sustainability.water);
  }

  const total = {
    ...summary,
    price: summary?.sum,
    sale: {},
  };

  if (summary?.sumWithoutDiscount && summary?.discount) {
    total.sale.oldPrice = summary?.sumWithoutDiscount;
    total.sale.percent = summary?.discount;
  }

  return {
    minimalOrder,
    fabrics,
    fabricsChanged,
    fabricsSold,
    fabricsSamples,
    total,
    promoCode,
    promoDiscount,
    cartToConfirm: {
      ordered,
      updated,
      samples,
    },
  };
}
