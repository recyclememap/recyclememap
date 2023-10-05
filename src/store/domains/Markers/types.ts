import { LatLngExpression } from 'leaflet';
import type { flatIconsKeys } from '@root/components';

export type NewMarkerForm = {
  wasteTypes: string[];
};

export type NewMarker = {
  position: number[];
  address: string;
} & NewMarkerForm;

export type Marker = {
  id: string;
  position: LatLngExpression;
  icons: flatIconsKeys[];
  address: string;
  date: string;
};

export type MarkersList = Marker[];
