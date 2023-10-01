import { LatLngExpression } from 'leaflet';
import type { flatIconsKeys } from '@root/components';

export type NewMarker = {
  position: number[];
};

export type Marker = {
  id: string;
  position: LatLngExpression;
  icons: flatIconsKeys[];
  street: string;
  date: string;
};

export type MarkersList = Marker[];
