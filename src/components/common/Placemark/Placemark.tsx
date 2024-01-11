import * as Leaflet from 'leaflet';
import { observer } from 'mobx-react-lite';
import { useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { Marker as LeafletMarker, Popup as LeafletPopper } from 'react-leaflet';
import { MarkerState } from '@common/constants';
import { useStore } from '@root/store';
import { Marker as MarkerType } from '@root/store/domains/Markers/types';
import { Marker } from './Marker/Marker';
import { Popper } from './Popper/Popper';

type PlacemarkProps = {
  marker: MarkerType;
};

export const Placemark = observer(({ marker }: PlacemarkProps) => {
  const { markersDomain, markersView, sidebarView } = useStore();
  const { address, wasteTypes, position } = marker;

  const icon = Leaflet.divIcon({
    className: 'marker',
    iconSize: [40, 40],
    iconAnchor: [20, 47],
    popupAnchor: [0, -19],
    html: `
    <div data-testid=placemark-${address}>
      ${renderToString(<Marker icons={wasteTypes} />)}
    </div>`
  });

  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        markerRef.current && markerRef.current.openPopup();
      },
      mouseout() {
        markerRef.current && markerRef.current.closePopup();
      },
      click: () => {
        markersDomain.setActiveMarker(marker);
        markersView.setState(MarkerState.Active);
        markersView.setIsNewMobileMarkerActive(false);
        markersView.setIsNewMarkerActive(false);
        sidebarView.setIsOpen(true);
      }
    }),
    [marker, markersView, markersDomain, sidebarView]
  );

  return (
    <LeafletMarker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={eventHandlers}
    >
      <LeafletPopper offset={[0, -16]} closeButton={false}>
        <Popper icons={wasteTypes} address={address} />
      </LeafletPopper>
    </LeafletMarker>
  );
});
