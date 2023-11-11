import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MOBILE_SIDEBAR_HEIGHT, MarkerState } from '@common/constants';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { debounce, noop } from '@utils/helpers';

export const CenterPositionControl = observer(() => {
  const { mapDomain, markersView, markersDomain, loader } = useStore();
  const map = useMap();

  const getAddress = useCallback(async () => {
    const containerPoint = map.containerPointToLayerPoint([
      map.getSize().x / 2,
      (map.getSize().y - MOBILE_SIDEBAR_HEIGHT) / 2 + 40
    ]);
    const latLng = map.layerPointToLatLng(containerPoint);

    const isCorrectPosition = mapDomain.checkCurrentPosition(latLng);

    if (!isCorrectPosition) {
      markersView.setIsUnsupportedCoordinates(true);

      return;
    }

    markersView.setIsUnsupportedCoordinates(false);

    loader.setLoader(MapLoaders.GetAddress);

    await mapDomain
      .getAddress(latLng.lat, latLng.lng)
      .then(() => mapDomain.setCurrentPosition(latLng))
      .catch(noop);

    if (
      markersView.state === MarkerState.Edit &&
      mapDomain.currentAddress &&
      mapDomain.currentPosition
    ) {
      markersDomain.updateSuggestion({
        address: mapDomain.currentAddress,
        position: [mapDomain.currentPosition.lat, mapDomain.currentPosition.lng]
      });
    }

    loader.deleteLoader(MapLoaders.GetAddress);
  }, [map, mapDomain, markersView, markersDomain, loader]);

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
