import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// import CartIconEmpty from '../../icons/CartIconEmpty';



export default function PageHeader(props) {
  const { title, text, icon: Icon, oneSize, sx, isLoading } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '60px',
        mt: '23px',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: { xs: '320px', sm: '432px', md: '624px' },
        }}
      >
        {Icon && <Icon sx={{ mb: '18px', fontSize: '44px', color: 'colors.mediumGrey' }} />}

        {!!isLoading && (
          <Skeleton
            sx={{
              maxWidth: '60%',
              width: '400px',
              mb: '16px',
              fontSize: { xs: '32px', sm: '40px', md: '52px' },
            }}
          />
        )}

        {!isLoading && title && (
          <Typography
            variant="h1"
            sx={{
              color: 'colors.almostBlack',
              fontWeight: 600,
              textAlign: 'center',
              mb: '16px',
              lineHeight: '140%',
              fontSize: oneSize ? '32px' : { xs: '32px', sm: '40px', md: '52px' },
            }}
          >
            {title}
          </Typography>
        )}

        {!!isLoading && (
          <>
            <Skeleton
              sx={{
                width: '500px',
                maxWidth: '90%',
                lineHeight: '140%',
                fontSize: { xs: '14px', sm: '16px' },
              }}
            />
            <Skeleton
              sx={{
                width: '350px',
                maxWidth: '60%',
                lineHeight: '140%',
                fontSize: { xs: '14px', sm: '16px' },
              }}
            />
          </>
        )}

        {!isLoading && text && (
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 400,
              color: 'colors.darkGrey',
              fontSize: oneSize ? '14px' : { xs: '14px', sm: '16px' },
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
