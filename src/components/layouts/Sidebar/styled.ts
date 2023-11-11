import { styled } from '@mui/material/styles';
import { Flex } from '@root/components/containers';
import { sizes } from '@root/theme';

export const StyledSidebar = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  top: sizes[16].px,
  left: sizes[16].px,
  width: '450px',
  borderRadius: sizes[16].px,
  boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
  background: theme!.palette.common.white,
  zIndex: 1000,
  padding: sizes[16].rem
}));
