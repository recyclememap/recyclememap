import { LatLngExpression } from 'leaflet';
import * as Leaflet from 'leaflet';
import { renderToString } from 'react-dom/server';
import { Marker as LeafletMarker, Popup as LeafletPopper } from 'react-leaflet';
import type { flatIconsKeys } from '@root/components';
import { Marker } from './Marker/Marker';
import { Popper } from './Popper/Popper';

type PlacemarkProps = {
  icons: flatIconsKeys[];
  street: string;
  position: LatLngExpression;
};

export const Placemark = ({ icons, street, position }: PlacemarkProps) => {
  const icon = Leaflet.divIcon({
    className: 'marker',
    iconSize: [50, 50],
    html: `
    <div data-testid=placemark-${street}>
      ${renderToString(<Marker icons={icons} />)}
    </div>`
  });

  return (
    <>
      <LeafletMarker position={position} icon={icon}>
        <LeafletPopper>
          <Popper icons={icons} street={street} />
        </LeafletPopper>
      </LeafletMarker>
    </>
  );
};
