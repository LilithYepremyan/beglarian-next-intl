import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';

function LikeIconActive(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12 22C12.3083 22 12.7589 21.7652 13.1265 21.5304C19.7549 17.3042 24 12.3501 24 7.33725C24 3.00534 20.9763 0 17.1937 0C14.834 0 13.0672 1.29136 12 3.21665C10.9565 1.29136 9.17787 0 6.81818 0C3.02372 0 0 3.00534 0 7.33725C0 12.3501 4.25692 17.3042 10.8735 21.5304C11.2411 21.7652 11.6917 22 12 22Z" />
    </SvgIcon>
  );
}

export default LikeIconActive;
