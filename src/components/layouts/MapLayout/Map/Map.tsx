import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import { MAX_MAP_ZOOM } from '@common/constants';
import AddLocationIcon from '@components/common/Icon/assets/addLocation.svg';
import { useStore } from '@root/store';
import { CenterPositionControl } from './controllers/CenterPositionControl';

export const Map = observer(() => {
  const { mapDomain, markerView } = useStore();
  const map = useMap();

  useMapEvents({
    click: async (event) => {
      if (markerView.isNewMarkerActive && event.latlng) {
        markerView.setIsMarkerDialogOpen(true);
        markerView.setIsNewMarkerActive(false);

        await mapDomain
          .getAddress(event.latlng.lat, event.latlng.lng)
          .catch(() => markerView.setIsMarkerDialogOpen(false));

        if (mapDomain.currentAddress) {
          mapDomain.setCurrentPosition(event.latlng);
        }
      }
    }
  });

  useEffect(() => {
    map.getContainer().style.cursor = markerView.isNewMarkerActive
      ? `url(${AddLocationIcon}) 20 40, auto`
      : 'grab';
  }, [map, markerView.isNewMarkerActive]);

  return (
    <>
      <TileLayer
        maxZoom={MAX_MAP_ZOOM}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {markerView.isNewMobileMarkerActive && <CenterPositionControl />}
    </>
  );
});
