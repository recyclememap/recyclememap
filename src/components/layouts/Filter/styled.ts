import { styled } from '@mui/material/styles';
import { Flex } from '@root/components/containers';
import { sizes } from '@root/theme';

export const StyledFilter = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  top: sizes[64].px,
  left: sizes[16].px,
  width: '80%',
  zIndex: 1,
  gap: sizes[8].rem,
  flexWrap: 'wrap',
  rowGap: sizes[8].rem,

  [theme.breakpoints.up('md')]: {
    width: '450px'
  }
}));
