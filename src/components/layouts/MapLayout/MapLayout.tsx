import { useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';
import {
  ASHDOD_COORDINATES,
  ASHDOD_MAX_BOUNDS,
  INITIAL_MAP_ZOOM,
  MIN_MAP_ZOOM
} from '@common/constants';
import { useStore } from '@root/store';
import { mapStyle } from './map.css';
import { Map } from './Map/Map';
import { StyledWrapper } from './styled';

export const MapLayout = observer(() => {
  const theme = useTheme();
  const { markerView } = useStore();

  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth > theme.breakpoints.values.md) {
        markerView.setIsNewMobileMarkerActive(false);
      } else {
        markerView.setIsNewMarkerActive(false);
        markerView.setIsMarkerDialogOpen(false);
      }
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [markerView, theme]);

  return (
    <StyledWrapper isMobileMarkerActive={markerView.isNewMobileMarkerActive}>
      <LeafletMapContainer
        center={ASHDOD_COORDINATES}
        maxBounds={ASHDOD_MAX_BOUNDS}
        zoom={INITIAL_MAP_ZOOM}
        minZoom={MIN_MAP_ZOOM}
        className={mapStyle}
        zoomControl={false}
      >
        <Map />
      </LeafletMapContainer>
    </StyledWrapper>
  );
});
