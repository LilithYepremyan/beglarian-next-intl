/* eslint-disable max-len */

import SvgIcon from '@mui/material/SvgIcon';
import React from 'react';

function SuccessIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="12" fill="#E0F1E9" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.28803 11.777C6.67206 11.3777 7.29471 11.3777 7.67875 11.777L10.3278 14.5314L16.3213 8.29949C16.7053 7.90017 17.3279 7.90017 17.712 8.29949C18.096 8.69881 18.096 9.34623 17.712 9.74554L11.0232 16.7005C10.6391 17.0998 10.0165 17.0998 9.63244 16.7005L6.28803 13.223C5.90399 12.8237 5.90399 12.1763 6.28803 11.777Z"
        fill="#41BD83"
      />
    </SvgIcon>
  );
}

export default SuccessIcon;
