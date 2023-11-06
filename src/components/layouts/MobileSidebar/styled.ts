import { styled } from '@mui/material/styles';
import { MOBILE_SIDEBAR_HEIGHT } from '@common/constants';
import { Flex } from '@components/containers';
import { sizes } from '@root/theme';

export const StyledSidebar = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
  bottom: 0,
  width: '100%',
  height: MOBILE_SIDEBAR_HEIGHT,
  padding: sizes[8].rem,
  background: theme!.palette.common.white,
  borderTopLeftRadius: sizes[8].rem,
  borderTopRightRadius: sizes[8].rem,
  boxShadow: `0 1px 2px ${theme.palette.grey[300]}, 0 2px 6px 2px ${theme.palette.grey[300]};`
}));
