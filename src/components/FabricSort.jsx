import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import ArrowDownIcon from '@/icons/ArrowDownIcon';

export default function FabricSort(props) {
  const { onSortChange, sorts: sortsFromProps = [], currentSortId, sx } = props;

  const sorts = [...sortsFromProps];

  const currentSort = sorts.find(x => x.id === currentSortId);

  return (
    <Box sx={sx}>
      <Select
        IconComponent={iconProps => (
          <ArrowDownIcon
            {...iconProps}
            sx={{ fontSize: '16px', right: '12px !important', color: 'colors.almostBlack' }}
          />
        )}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          sx: {
            '.MuiMenu-paper': {
              width: '224px',
              mt: '8px',
            },
          },
        }}
        sx={{
          backgroundColor: 'colors.lightGrey',
          pr: '8px',

          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent !important',
          },
          '.MuiOutlinedInput-input': {
            textAlign: 'right',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent !important',
          },
        }}
        value={currentSort}
        onChange={event => {
          onSortChange(Number(event?.target?.value));
        }}
        input={<OutlinedInput />}
        renderValue={x => x.name}
      >
        {sorts.map(x => (
          <MenuItem
            sx={{
              height: '48px',
              display: 'flex',
              flexDirection: 'column',
              py: 0,
              px: '20px',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            key={x.id}
            value={x.id}
          >
            <Typography sx={{ fontWeight: 'bold', display: 'flex', marginTop: 'auto' }}>{x.name}</Typography>
            <Divider sx={{ width: '100%', marginTop: 'auto' }} key={`sort-divider-${x.id}`} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
