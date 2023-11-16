import { MarkersList, WasteTypes } from '@root/store/domains/Markers/types';

export const MARKERS_MOCK: MarkersList = [
  {
    id: 'testId',
    position: [31.806977393531774, 34.64675903320313],
    wasteTypes: [WasteTypes.Glass, WasteTypes.Paper],
    address: 'testAddress',
    date: '2023-08-15T21:37:05.406Z'
  }
];
