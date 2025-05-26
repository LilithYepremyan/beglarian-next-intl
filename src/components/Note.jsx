import Box from '@mui/material/Box';
import * as React from 'react';

import WarningIcon from '@/icons/WarningIcon';
import { colors as palette } from '@/theme';

const backgrounds = {
  success: palette.gold,
  info: palette.lightGreen,
};

const colors = {
  success: palette.golder,
  info: palette.almostBlack,
};

const paddings = {
  success: '8px 12px',
  info: '12px 12px',
};

const fontSizes = {
  success: '11px',
  info: '12px',
};

export default function Note(props) {
  const { children, variant = 'info', icon, CustomIcon, centered, sx } = props;

  const background = backgrounds[variant];
  const textColor = colors[variant];
  const padding = paddings[variant];
  const fontSize = fontSizes[variant];

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        gap: '12px',
        justifyContent: centered ? 'center' : 'flex-start',
        fontSize,
        width: '100%',
        padding,
        fontWeight: 400,
        borderRadius: '8px',
        background,
        color: textColor,
        ...sx,
      }}
    >
      {icon && !CustomIcon && <WarningIcon sx={{ fontSize: 16 }} />}
      {icon && CustomIcon && <CustomIcon sx={{ fontSize: 16 }} />}
      <Box>{children}</Box>
    </Box>
  );
}
