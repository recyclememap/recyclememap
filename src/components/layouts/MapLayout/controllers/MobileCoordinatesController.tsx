import { Map } from '@maptiler/sdk';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { MOBILE_SIDEBAR_HEIGHT } from '@common/constants';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { debounce, noop } from '@utils/helpers';

type MobileCoordinatesControllerProps = {
  map: Map;
};

export const MobileCoordinatesController = observer(
  ({ map }: MobileCoordinatesControllerProps) => {
    const { mapDomain, markersView, markersDomain, loader } = useStore();

    const getAddress = useCallback(async () => {
      // Convert LatLng into px
      const currentCenterPixel = map.project(map.getCenter());
      currentCenterPixel.y =
        (currentCenterPixel.y * 2 - MOBILE_SIDEBAR_HEIGHT) / 2 + 40;

      // Convert px into LatLng
      const latLng = map.unproject(currentCenterPixel);

      const isCorrectPosition = mapDomain.checkCurrentPosition(latLng);
      if (!isCorrectPosition) {
        markersView.setIsUnsupportedCoordinates(true);
        return;
      }
      markersView.setIsUnsupportedCoordinates(false);
      loader.setLoader(MapLoaders.GetAddress);
      await mapDomain.getAddress(latLng.lat, latLng.lng).catch(noop);
      if (mapDomain.currentAddress) {
        markersDomain.updateSuggestion({
          address: mapDomain.currentAddress,
          position: [latLng.lat, latLng.lng]
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
      getAddress();
      // eslint-disable-next-line
  }, []);

    return null;
  }
);
