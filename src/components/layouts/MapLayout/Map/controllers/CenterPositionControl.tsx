import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MOBILE_DIALOG_HEIGHT } from '@common/constants';
import { useStore } from '@root/store';
import { debounce, noop } from '@utils/helpers';

export const CenterPositionControl = observer(() => {
  const { mapDomain, markersView } = useStore();
  const map = useMap();

  const getAddress = useCallback(async () => {
    const containerPoint = map.containerPointToLayerPoint([
      map.getSize().x / 2,
      (map.getSize().y - MOBILE_DIALOG_HEIGHT) / 2 + 40
    ]);
    const latLng = map.layerPointToLatLng(containerPoint);

    const isCorrectPosition = mapDomain.checkCurrentPosition(latLng);

    if (!isCorrectPosition) {
      markersView.setIsUnsupportedCoordinates(true);

      return;
    }

    markersView.setIsUnsupportedCoordinates(false);

    await mapDomain
      .getAddress(latLng.lat, latLng.lng)
      .then(() => mapDomain.setCurrentPosition(latLng))
      .catch(noop);
  }, [map, mapDomain, markersView]);

  useEffect(() => {
    const debouncedMove = debounce(getAddress);
    map.on('move', debouncedMove);

    return () => {
      map.off('move', debouncedMove);
    };
  }, [map, getAddress]);

  useEffect(() => {
    if (markersView.isNewMobileMarkerActive) {
      getAddress();
    }
  }, [markersView.isNewMobileMarkerActive, getAddress]);

  return null;
});
