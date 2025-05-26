import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import IconButton from './IconButton';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

export default function SliderControl(props) {
  const { current = 1, to, handleNext, handlePrev, inset = true } = props;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        p: inset ? '4px' : '0px',
        backgroundColor: inset ? 'rgba(19, 33, 70, 0.2)' : 'none',
        borderRadius: '40px',
        width: 'auto',
      }}
    >
      <IconButton
        icon={ArrowLeftIcon}
        variant="contained"
        color="secondary"
        onClick={event => {
          event.stopPropagation();
          handlePrev();
        }}
        sx={{ borderRadius: '50%', p: 1, minWidth: 0 }}
      />
      <Typography sx={{ minWidth: '32px', fontWeight: 600, color: inset ? 'colors.white' : 'colors.almostBlack' }}>
        {current} / {to}
      </Typography>
      <IconButton
        icon={ArrowRightIcon}
        variant="contained"
        color="secondary"
        onClick={event => {
          event.stopPropagation();
          handleNext();
        }}
        sx={{ borderRadius: '50%', p: 1, minWidth: 0 }}
      />
    </Box>
  );
}
