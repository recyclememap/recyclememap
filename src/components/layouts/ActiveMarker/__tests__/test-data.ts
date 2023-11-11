import { LatLngTuple } from 'leaflet';
import { WasteTypes } from '@common/constants';

export const ACTIVE_MARKER = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [321, 444] as LatLngTuple,
  wasteTypes: [WasteTypes.Plastic],
  address: 'test'
};

export const ActiveMarkerElements = {
  AddressLabel: 'common.addressLabel',
  Address: 'test address',
  WasteTypesLabel: 'activeMarker.wasteTypesLabel',
  WasteType: `icons.${ACTIVE_MARKER.wasteTypes}.title`,
  DateLabel: 'activeMarker.dateLabel',
  Date: new Date(ACTIVE_MARKER.date).toLocaleDateString(),
  EditButton: 'common.editButton'
};
