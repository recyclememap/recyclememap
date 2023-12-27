import { styled } from '@mui/material/styles';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';
import { MOBILE_SIDEBAR_HEIGHT } from '@common/constants';
import { sizes } from '@root/theme';

interface StyledWrapperProps {
  isSidebarOpen: boolean;
}

// TODO: Create custom zoom controller instead
export const StyledWrapper = styled('div')(
  ({ isSidebarOpen }: StyledWrapperProps) => ({
    '& .leaflet-bottom': {
      position: 'fixed'
    },
    '& .leaflet-control-zoom': {
      border: 'none',
      marginRight: sizes[24].rem,
      bottom: isSidebarOpen ? `${MOBILE_SIDEBAR_HEIGHT}px` : '0px',
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

export const MapContainer = styled(LeafletMapContainer)({
  height: '100vh'
});
