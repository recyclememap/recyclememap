import { GeocodingControl } from '@maptiler/geocoding-control/maptilersdk';
import { BBox } from '@maptiler/geocoding-control/types';
import { config as MapTilerConfig, Map } from '@maptiler/sdk';
import { GlobalStyles, useMediaQuery, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ASHDOD_BOUNDS,
  ASHDOD_COORDINATES,
  INITIAL_MAP_ZOOM,
  SEARCH_COUNTRY_NAME
} from '@common/constants';
import { MAPTILER_API_KEY } from '@common/env';
import AddLocationIcon from '@components/common/Icon/assets/addLocation.svg';
import { Placemark } from '@root/components';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { NotificationType } from '@root/store/domains/Notification/types';
import { MobileCoordinatesController } from './controllers/MobileCoordinatesController';
import { StyledMap, mapStyleOverride } from './styled';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import '@maptiler/geocoding-control/style.css';

export const MapLayout = observer(() => {
  const {
    sidebarView,
    markersDomain,
    mapDomain,
    markersView,
    notification,
    loader
  } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  MapTilerConfig.apiKey = MAPTILER_API_KEY;

  useEffect(() => {
    if (!map.current) {
      map.current = new Map({
        container: mapContainer.current as HTMLDivElement,
        style: `https://api.maptiler.com/maps/a13e2cbb-d665-441f-8002-fc56ec246972/style.json?key=${MAPTILER_API_KEY}`,
        center: ASHDOD_COORDINATES,
        zoom: INITIAL_MAP_ZOOM,
        minZoom: 13,
        navigationControl: 'bottom-right',
        geolocateControl: 'bottom-right',
        maxBounds: ASHDOD_BOUNDS
      });

      map.current.on('click', async (event) => {
        if (event.originalEvent.target !== map.current?.getCanvas()) {
          return;
        }

        if (markersView.isNewMarkerActive && event.lngLat) {
          const isCorrectPosition = mapDomain.checkCurrentPosition(
            event.lngLat
          );

          if (!isCorrectPosition) {
            notification.setCurrentNotification({
              message: t('mapLayout.invalidCoordinatesErrorMessage'),
              details: t('mapLayout.invalidCoordinatesErrorDetails'),
              type: NotificationType.Error
            });

            return;
          }

          loader.setLoader(MapLoaders.GetAddress);

          sidebarView.setIsOpen(true);
          markersView.setIsNewMarkerActive(false);

          await mapDomain
            .getAddress(event.lngLat.lat, event.lngLat.lng)
            .catch(() => markersView.setState(null));

          if (mapDomain.currentAddress) {
            markersDomain.updateSuggestion({
              address: mapDomain.currentAddress,
              position: [event.lngLat.lat, event.lngLat.lng]
            });
          }

          loader.deleteLoader(MapLoaders.GetAddress);
        }
      });

      const gc = new GeocodingControl({
        bbox: ASHDOD_BOUNDS as BBox,
        country: SEARCH_COUNTRY_NAME,
        errorMessage: t('mapLayout.searchError'),
        placeholder: t('mapLayout.searchPlaceholder'),
        noResultsMessage: t('mapLayout.noResultError')
      });

      map.current.addControl(gc, 'top-left');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.getCanvas().style.cursor = markersView.isNewMarkerActive
        ? `url(${AddLocationIcon}) 20 40, auto`
        : 'grab';
    }
  }, [markersView.isNewMarkerActive]);

  return (
    <>
      <StyledMap
        ref={mapContainer}
        className="map"
        isSidebarOpen={sidebarView.isOpen && isMobile}
      />
      {map.current && (
        <>
          {markersDomain.markers.length > 0 &&
            markersDomain.markers.map((marker, idx) => (
              <Placemark key={idx} marker={marker} map={map.current!} />
            ))}
          {markersView.isNewMobileMarkerActive && (
            <MobileCoordinatesController map={map.current} />
          )}
        </>
      )}
      <GlobalStyles styles={mapStyleOverride} />
    </>
  );
});
