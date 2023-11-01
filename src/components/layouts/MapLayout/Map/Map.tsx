import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import { MAX_MAP_ZOOM } from '@common/constants';
import AddLocationIcon from '@components/common/Icon/assets/addLocation.svg';
import { useStore } from '@root/store';
import { NotificationType } from '@root/store/domains/Notification/types';
import { CenterPositionControl } from './controllers/CenterPositionControl';

export const Map = observer(() => {
  const { mapDomain, markersView, notification } = useStore();
  const { t } = useTranslation();
  const map = useMap();

  useMapEvents({
    click: async (event) => {
      if (markersView.isNewMarkerActive && event.latlng) {
        const isCorrectPosition = mapDomain.checkCurrentPosition(event.latlng);

        if (!isCorrectPosition) {
          notification.setCurrentNotification({
            message: t('map.invalidCoordinatesErrorMessage'),
            details: t('map.invalidCoordinatesErrorDetails'),
            type: NotificationType.Error
          });

          return;
        }

        markersView.setIsNewMarkerDialogOpen(true);
        markersView.setIsNewMarkerActive(false);

        await mapDomain
          .getAddress(event.latlng.lat, event.latlng.lng)
          .catch(() => markersView.setIsNewMarkerDialogOpen(false));

        if (mapDomain.currentAddress) {
          mapDomain.setCurrentPosition(event.latlng);
        }
      }
    }
  });

  useEffect(() => {
    map.getContainer().style.cursor = markersView.isNewMarkerActive
      ? `url(${AddLocationIcon}) 20 40, auto`
      : 'grab';
  }, [map, markersView.isNewMarkerActive]);

  return (
    <>
      <TileLayer
        maxZoom={MAX_MAP_ZOOM}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {markersView.isNewMobileMarkerActive && <CenterPositionControl />}
    </>
  );
});
