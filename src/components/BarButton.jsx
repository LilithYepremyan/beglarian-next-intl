import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// import { ElementType, MouseEventHandler } from 'react';

// import CartIconEmpty from '../icons/CartIconEmpty';



export default function BarButton(props) {
  const { disabled, icon, onClick, sx, variant, text, component, to, active } = props;

  const Icon = icon;

  return (
    <Button
      component={component}
      href={to}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      sx={{
        '&: hover': {
          backgroundColor: 'colors.darkGrey',
          borderColor: 'colors.darkGrey',
        },
        backgroundColor: active ? 'colors.darkGrey' : 'transparent',
        borderRadius: text ? '40px' : '50%',
        border: '1px solid',
        borderColor: 'colors.darkGrey',
        color: 'colors.white',
        flexShrink: 0,
        minWidth: 0,
        p: '12px',
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: '16px', color: 'colors.white' }} />
      {!!text && (
        <Typography
          variant="body1"
          sx={{ ml: '8px', fontWeight: 600, fontSize: '14px', lineHeight: 0, color: 'colors.white' }}
        >
          {text}
        </Typography>
      )}
    </Button>
  );
}
