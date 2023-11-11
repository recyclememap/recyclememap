import { WasteTypes } from '@common/constants';
import { Marker as MarkerType } from '@root/store/domains/Markers/types';

export const Marker: MarkerType = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [123, 456],
  wasteTypes: [WasteTypes.Plastic],
  address: 'test-address-name'
};

export const PlacemarkId = `placemark-test-address-name`;
