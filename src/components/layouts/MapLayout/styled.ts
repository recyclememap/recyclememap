import { styled } from '@mui/material/styles';
import { MOBILE_DIALOG_HEIGHT } from '@common/constants';
import { sizes } from '@root/theme';

interface StyledWrapperProps {
  isMobileMarkerActive: boolean;
}

// TODO: Create custom zoom controller instead
export const StyledWrapper = styled('div')(
  ({ isMobileMarkerActive }: StyledWrapperProps) => ({
    '& .leaflet-control-zoom': {
      border: 'none',
      marginRight: sizes[24].rem,
      bottom: isMobileMarkerActive ? `${MOBILE_DIALOG_HEIGHT}px` : '0px',
      transition: 'bottom 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    },
    '& .leaflet-touch .leaflet-bar a:first-of-type': {
      width: sizes[32].rem,
      height: sizes[32].rem,
      borderTopRightRadius: sizes[16].px,
      borderTopLeftRadius: sizes[16].px
    },
    '& .leaflet-touch .leaflet-bar a:last-of-type': {
      width: sizes[32].rem,
      height: sizes[32].rem,
      borderBottomRightRadius: sizes[16].px,
      borderBottomLeftRadius: sizes[16].px
    }
  })
);
