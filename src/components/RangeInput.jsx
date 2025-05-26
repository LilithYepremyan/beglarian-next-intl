import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';

import Input from './Input';

export default function RangeInput(props) {
  const { from, to, setFrom, setTo, units, sx, placeholderFrom, placeholderTo } = props;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Input
        autoComplete="off"
        fullWidth
        placeholder={placeholderFrom}
        value={from || ''}
        inputProps={{
          type: 'number',
          pattern: '[0-9]*',
        }}
        InputProps={{
          endAdornment: units && <InputAdornment position="end">{units}</InputAdornment>,
        }}
        onChange={event => {
          const { value } = event.target;

          setFrom(Number(value));
        }}
      />
      <Input
        autoComplete="off"
        fullWidth
        placeholder={placeholderTo}
        value={to || ''}
        inputProps={{
          type: 'number',
          pattern: '[0-9]*',
        }}
        InputProps={{
          endAdornment: units && <InputAdornment position="end">{units}</InputAdornment>,
        }}
        onChange={event => {
          const { value } = event.target;

          setTo(Number(value));
        }}
      />
    </Box>
  );
}
