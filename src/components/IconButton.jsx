import Button from '@mui/material/Button';
import React from 'react';

export default function IconButton(props) {
  const { disabled, variant, color, icon, onClick, sx, fontSize = '16px' } = props;

  const Icon = icon;

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{ flexShrink: 0, minWidth: 0, p: '16px', ...sx }}
      variant={variant}
      color={color}
    >
      <Icon sx={{ fontSize }} />
    </Button>
  );
}
