import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CustomLink from './CustomLink';
import AccountIcon from '@/icons/AccountIcon';
import CloseIcon from '@/icons/CloseIcon';
import { events, track, Track } from '@/metrics';
import { useTranslations } from 'next-intl';

export default function LoginRegister(props) {
  const { isOpen, close } = props;

  const  tCommon  = useTranslations('common');
  const { sx } = props;

  return (
    <Modal disableAutoFocus={true} disableEnforceFocus={true} open={isOpen} onClose={close}>
      <Paper
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '32px',
          transform: 'translate(-50%, -50%)',
          maxWidth: '516px',
          width: '90%',
          borderRadius: '8px',
          backgroundColor: 'colors.gold',
          ...sx,
        }}
      >
        <CloseIcon
          onClick={() => close()}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'colors.almostBlack',
            cursor: 'pointer',
          }}
        />
        <AccountIcon sx={{ color: 'colors.golder', fontSize: '48px', mb: '32px' }} />
        <Typography sx={{ mb: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
          {tCommon('loginRegister.title')}
        </Typography>
        <Typography sx={{ mb: '32px', fontSize: '14px', color: 'colors.darkGrey' }}>
          {tCommon('loginRegister.text')}
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: '8px', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%' }}
            component={CustomLink}
            href={'/auth/login'}
            passfrom="true"
            onClick={() => {
              track(events.modals.loginRegister.loginButton.click);
            }}
          >
            {tCommon('loginRegister.loginButton')}
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ width: '100%' }}
            component={CustomLink}
            passfrom="true"
            href={'/auth/register'}
            onClick={() => {
              track(events.modals.loginRegister.registerButton.click);
            }}
          >
            {tCommon('loginRegister.registerButton')}
          </Button>
        </Box>

        <Track eventName={events.modals.loginRegister.shown} />
      </Paper>
    </Modal>
  );
}
