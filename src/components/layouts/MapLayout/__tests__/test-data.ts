import { MarkersList, WasteTypes } from '@root/store/domains/Markers/types';

export const LayoutElements = {
  FabTitle: 'markerLayout.addMarker'
};

export const ADDRESS_MOCK = 'test address';

const ADDRESS_NAME_MOCK = 'testAddress';

export const MARKERS_MOCK: MarkersList = [
  {
    id: 'testId',
    position: [31.806977393531774, 34.64675903320313],
    wasteTypes: [WasteTypes.Glass, WasteTypes.Paper],
    address: ADDRESS_NAME_MOCK,
    date: '2023-08-15T21:37:05.406Z'
  }
];

export const MARKER_ID = `placemark-${ADDRESS_NAME_MOCK}`;
