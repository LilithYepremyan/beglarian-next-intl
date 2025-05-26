export default function pluralize(num, formsI18) {
  const modulo10 = num % 10;
  const modulo100 = num % 100;

  const forms = formsI18.split(', ');

  if ((modulo100 > 10 && modulo100 < 20) || modulo10 > 4 || modulo10 === 0) {
    return forms[2];
  }

  if (modulo10 === 1) {
    return forms[0];
  }

  return forms[1];
}
