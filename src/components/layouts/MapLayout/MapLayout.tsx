import { useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer } from 'react-leaflet';
import { ASHDOD_COORDINATES, INITIAL_MAP_ZOOM } from '@common/constants';
import { Placemark } from '@root/components';
import { useStore } from '@root/store';
import { noop } from '@utils/helpers';
import { mapStyle } from './map.css';
import { Map } from './Map/Map';
import { StyledWrapper } from './styled';

export const MapLayout = observer(() => {
  const { sidebarView, markersDomain } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    markersDomain.getMarkers().catch(noop);
    // eslint-disable-next-line
  }, []);

  return (
    <StyledWrapper isSidebarOpen={sidebarView.isOpen && isMobile}>
      <LeafletMapContainer
        center={ASHDOD_COORDINATES}
        zoom={INITIAL_MAP_ZOOM}
        className={mapStyle}
        zoomControl={false}
      >
        <Map />
        {markersDomain.markers.length > 0 &&
          markersDomain.markers.map((marker, idx) => (
            <Placemark key={idx} marker={marker} />
          ))}
      </LeafletMapContainer>
    </StyledWrapper>
  );
});
