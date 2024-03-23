import {
  Map,
  Popup as MaptilerPopup,
  Marker as MaptilerMarker
} from '@maptiler/sdk';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { MarkerState } from '@common/constants';
import { useStore } from '@root/store';
import { Marker as MarkerType } from '@root/store/domains/Markers/types';
import { Marker } from './Marker/Marker';
import { Popper } from './Popper/Popper';

type PlacemarkProps = {
  marker: MarkerType;
  map: Map;
};

export const Placemark = observer(({ marker, map }: PlacemarkProps) => {
  const { markersDomain, markersView, sidebarView } = useStore();
  const { address, wasteTypes, position } = marker;

  useEffect(() => {
    if (!map) return;

    const popupWrapper = document.createElement('div');
    createRoot(popupWrapper).render(
      <Popper address={address} icons={wasteTypes} />
    );

    const popup = new MaptilerPopup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -48],
      maxWidth: '260px',
      anchor: 'bottom'
    }).setDOMContent(popupWrapper);

    const markerWrapper = document.createElement('div');
    markerWrapper.innerHTML = renderToString(<Marker icons={wasteTypes} />);

    const maptilerMarker = new MaptilerMarker({
      element: markerWrapper,
      anchor: 'bottom',
      offset: [0, -7]
    })
      .setLngLat([...(position as any)].reverse() as any)
      .setPopup(popup)
      .addTo(map);

    const markerHoverHandler = () => popup.addTo(map);
    const markerLeaveHandler = () => popup.remove();
    const markerClickHandler = () => {
      markersDomain.setActiveMarker(marker);
      markersView.setState(MarkerState.Active);
      markersView.setIsNewMobileMarkerActive(false);
      markersView.setIsNewMarkerActive(false);
      sidebarView.setIsOpen(true);
    };

    markerWrapper.addEventListener('click', markerClickHandler);
    markerWrapper.addEventListener('mouseenter', markerHoverHandler);
    markerWrapper.addEventListener('mouseleave', markerLeaveHandler);

    return () => {
      markerWrapper.removeEventListener('click', markerClickHandler);
      markerWrapper.removeEventListener('mouseenter', markerHoverHandler);
      markerWrapper.removeEventListener('mouseleave', markerLeaveHandler);
      maptilerMarker.remove();
    };
  }, [
    address,
    map,
    marker,
    markersDomain,
    markersView,
    position,
    sidebarView,
    wasteTypes
  ]);

  return null;
});
