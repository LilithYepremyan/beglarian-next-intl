import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Label from './Label';
import { useTranslations } from 'next-intl';

export default function Price(props) {
  const { price, sale, perMeter = true, showPercent = true } = props;

  const  tCommon = useTranslations("common");

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Typography variant="body1" sx={{ mb: '4px', fontSize: '18px', fontWeight: 'bold', textAlign: 'right' }}>
        {`${price.toFixed(1)}\xa0`}
        <Typography
          variant="body1"
          component="span"
          sx={{ fontSize: '14px', color: 'colors.darkGrey', fontWeight: 600 }}
        >
          {tCommon('units.currency')}
          {!!perMeter && `/${tCommon('units.metersShort')}`}
        </Typography>
      </Typography>
      {!!sale?.oldPrice && (
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', mb: '4px' }}>
          {!!showPercent && <Label text={`-${sale.percent}%`} variant="alert" />}
          <Typography
            variant="body1"
            color="error"
            sx={{
              fontSize: 14,
              fontWeight: 'bold',
              textDecoration: 'line-through',
            }}
          >
            {`${sale.oldPrice.toFixed(1)}\xa0${tCommon('units.currency')}`}
          </Typography>
        </Box>
      )}
      <Typography variant="body1" component="span" sx={{ fontSize: '12px', color: 'colors.darkGrey' }}>
        {tCommon('tax')}
      </Typography>
    </Box>
  );
}
