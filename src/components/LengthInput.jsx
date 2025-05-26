import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import IconButton from './IconButton';
import Input from './Input';
import MinusIcon from '@/icons/MinusIcon';
import PlusIcon from '@/icons/PlusIcon';
import { useTranslations } from 'next-intl';

export default function LengthInput(props) {
  const { length, setLength, max, min, isError, sx, onPlus, onMinus } = props;

  const  tCommon = useTranslations("common");
  const tFabric = useTranslations("fabric");

  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <IconButton
          disabled={length <= min}
          onClick={event => {
            if (onMinus) {
              onMinus();
            }

            const parsedLength = Number.parseFloat(length) || 0;

            const value = parsedLength - 1 < min ? min : Math.ceil(parsedLength - 1);

            setLength(value);
          }}
          variant="contained"
          color="secondary"
          icon={MinusIcon}
        />
        <Input
          autoComplete="off"
          fullWidth
          error={isError}
          value={length}
          inputProps={{
            style: { textAlign: 'center' },
            step: '0.1',
            inputMode: 'decimal',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{tCommon('units.metersShort')}</InputAdornment>,
          }}
          onChange={event => {
            const { value } = event.target;

            if (/^\d+[.,]?\d?$/.test(value) || value === '') {
              setLength(event.target.value.replace(',', '.'));
            }
          }}
        />
        <IconButton
          disabled={length >= max}
          onClick={event => {
            if (onPlus) {
              onPlus();
            }

            const parsedLength = Number.parseFloat(length) || 0;
            const value = parsedLength + 1 > max ? max : Math.floor(parsedLength + 1);

            setLength(value);
          }}
          variant="contained"
          color="secondary"
          icon={PlusIcon}
        />
      </Box>
      <Typography
        sx={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          mt: '8px',
          userSelect: 'none',
        }}
        variant="subtitle"
        color={isError ? 'error' : 'primary'}
      >
        {tFabric('possibleToOrder')}&nbsp;
        {tFabric('from')}&nbsp;
        <strong>
          {min}&nbsp;
          {tCommon('units.metersShort')}
        </strong>
        &nbsp;
        {tFabric('to')}&nbsp;
        <strong>
          {max}&nbsp;
          {tCommon('units.metersShort')}
        </strong>
      </Typography>
    </Box>
  );
}
