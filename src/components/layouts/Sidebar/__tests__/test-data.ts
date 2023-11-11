import { LatLngTuple } from 'leaflet';
import { WasteTypes } from '@common/constants';

export const ACTIVE_MARKER = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [321, 444] as LatLngTuple,
  wasteTypes: [WasteTypes.Plastic],
  address: 'test'
};

export const SUGGESTION_MARKER = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [123, 456] as LatLngTuple,
  wasteTypes: [WasteTypes.Plastic],
  address: 'test-address-name'
};

export const TextElements = {
  ActiveMarkerEditButton: 'common.editButton',
  EditMarkerTitle: 'editMarkerDialog.title',
  AddMarkerTitle: 'addMarkerDialog.title'
};

export const CLOSE_ICON_TEST_ID = 'sidebar--close-icon';
