import { styled } from '@mui/material/styles';
import { MOBILE_SIDEBAR_HEIGHT } from '@common/constants';
import { sizes } from '@root/theme';

interface StyledWrapperProps {
  isSidebarOpen: boolean;
}

export const StyledMap = styled('div')(
  ({ isSidebarOpen }: StyledWrapperProps) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',

    '& .maplibregl-ctrl-bottom-right': {
      marginRight: sizes[14].rem,
      bottom: isSidebarOpen ? `${MOBILE_SIDEBAR_HEIGHT - 40}px` : '0px',
      transition: 'bottom 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    }
  })
);
