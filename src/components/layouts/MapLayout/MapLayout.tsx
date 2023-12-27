import { useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ASHDOD_COORDINATES, INITIAL_MAP_ZOOM } from '@common/constants';
import { Placemark } from '@root/components';
import { useStore } from '@root/store';
import { Map } from './Map/Map';
import { StyledWrapper, MapContainer } from './styled';

export const MapLayout = observer(() => {
  const { sidebarView, markersDomain } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledWrapper isSidebarOpen={sidebarView.isOpen && isMobile}>
      <MapContainer
        center={ASHDOD_COORDINATES}
        zoom={INITIAL_MAP_ZOOM}
        zoomControl={false}
      >
        <Map />
        {markersDomain.markers.length > 0 &&
          markersDomain.markers.map((marker, idx) => (
            <Placemark key={idx} marker={marker} />
          ))}
      </MapContainer>
    </StyledWrapper>
  );
});
