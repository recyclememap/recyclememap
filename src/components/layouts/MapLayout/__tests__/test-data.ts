import { MarkersList } from '@root/store/domains/Markers/types';

export const LayoutElements = {
  FabTitle: 'markerLayout.addMarker'
};

export const MockBreakpoints = {
  desktop: 1200,
  mobile: 600
};

export const ADDRESS_MOCK = 'test address';

const STREET_NAME_MOCK = 'testStreet';

export const MARKERS_MOCK: MarkersList = [
  {
    id: 'testId',
    position: [31.806977393531774, 34.64675903320313],
    icons: ['glass', 'paper'],
    street: STREET_NAME_MOCK,
    date: '2023-08-15T21:37:05.406Z'
  }
];

export const MARKER_ID = `placemark-${STREET_NAME_MOCK}`;
