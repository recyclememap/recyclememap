import { styled } from '@mui/material/styles';
import { Flex } from '@root/components/containers';
import { sizes } from '@root/theme';

export const StyledSidebar = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '30%',
  minWidth: '450px',
  background: theme.palette.grey[50],
  zIndex: 1000,
  padding: sizes[16].rem
}));
