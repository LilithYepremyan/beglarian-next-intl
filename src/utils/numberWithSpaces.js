export default function numberWithSpaces(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\xa0');

  return parts.join('.');
}
