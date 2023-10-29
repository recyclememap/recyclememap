import { useTheme } from '@mui/material';
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
  const theme = useTheme();
  const { markersView, markersDomain } = useStore();

  useEffect(() => {
    markersDomain.getMarkers().catch(noop);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth > theme.breakpoints.values.md) {
        markersView.setIsNewMobileMarkerActive(false);
      } else {
        markersView.setIsNewMarkerActive(false);
        markersView.setIsNewMarkerDialogOpen(false);
      }
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [markersView, theme]);

  return (
    <StyledWrapper isMobileMarkerActive={markersView.isNewMobileMarkerActive}>
      <LeafletMapContainer
        center={ASHDOD_COORDINATES}
        zoom={INITIAL_MAP_ZOOM}
        className={mapStyle}
        zoomControl={false}
      >
        <Map />
        {markersDomain.markers.length > 0 &&
          markersDomain.markers.map(
            ({ position, wasteTypes, address }, idx) => (
              <Placemark
                key={idx}
                position={position}
                icons={wasteTypes}
                address={address}
              />
            )
          )}
      </LeafletMapContainer>
    </StyledWrapper>
  );
});
