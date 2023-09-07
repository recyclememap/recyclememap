import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sizes } from '@root/theme';

export const DialogContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  zIndex: 1000,
  bottom: 0,
  height: '180px',
  width: '100%',
  backgroundColor: 'white',
  borderTopLeftRadius: sizes[8].rem,
  borderTopRightRadius: sizes[8].rem,
  boxShadow: `0 1px 2px ${theme.palette.grey[300]}, 0 2px 6px 2px ${theme.palette.grey[300]};`,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));
