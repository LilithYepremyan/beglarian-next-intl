import Typography from '@mui/material/Typography';

import pluralize from "@/utils/pluralize"
import { useTranslations } from 'next-intl';

const timeFromMinutes = (timeInMinutes, fullTimeUnits = false) => {
  const  tCommon  = useTranslations('common');

  let result = 0;

  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  const showMinutes = hours < 2;

  const hoursFormatted = hours
    ? `${hours}\xa0${fullTimeUnits ? pluralize(hours, tCommon('units.hours')) : tCommon('units.hoursShort')}`
    : '';
  const minutesFormatted = minutes
    ? `${minutes}\xa0${fullTimeUnits ? pluralize(minutes, tCommon('units.minutes')) : tCommon('units.minutesShort')}`
    : '';
  const delimeter = hours && minutes ? '\xa0' : '';

  if (timeInMinutes === 0) {
    result = `0\xa0${fullTimeUnits ? pluralize(0, tCommon('units.minutes')) : tCommon('units.minutesShort')}`;
  } else {
    result = `${hoursFormatted}${delimeter}${showMinutes ? minutesFormatted : ''}`;
  }

  return result;
};

export default function Time(props) {
  const { timeInMinutes, fullTimeUnits, sx } = props;

  const result = timeFromMinutes(timeInMinutes, fullTimeUnits);

  return (
    <Typography component="span" sx={{ color: 'inherit', display: 'inline', fontSize: 'inherit', ...sx }}>
      {result}
    </Typography>
  );
}

export { timeFromMinutes };
