import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { colors } from '@/theme';

const Input = React.forwardRef((props, _ref) => {
  const { label, required, success } = props;

  return (
    <>
      {!!label && (
        <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: '8px' }}>
          {label} {!!required && <span style={{ color: colors.red }}>*</span>}
        </Typography>
      )}
      <TextField
        {...props}
        inputProps={{
          ...props?.inputProps,
          onWheel: e => e.currentTarget.blur(),
          autoCorrect: 'off',
          autoCapitalize: 'off',
          sx: {
            color: success ? `${colors.brightGreen} !important` : null,
          },
        }}
        label={null}
      />
    </>
  );
});

export default Input;
