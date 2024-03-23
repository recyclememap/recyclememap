import { LngLatLike } from '@maptiler/sdk';
import { WasteTypes } from '@common/constants';

export const ACTIVE_MARKER = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [321, 444],
  wasteTypes: [WasteTypes.Plastic],
  address: 'test'
};

export const SUGGESTION_MARKER = {
  id: 'testId',
  date: '2023-08-15T21:37:05.406Z',
  position: [123, 456],
  wasteTypes: [WasteTypes.Plastic],
  address: 'test-address-name'
};

export const FormElements = {
  Title: 'editMarkerDialog.title',
  AddressLabel: 'common.addressLabel',
  Address: 'test address',
  WasteTypesDescription: 'common.wasteTypesDescription',
  WasteTypesLabel: 'common.wasteTypesLabel',
  WasteType: `icons.${SUGGESTION_MARKER.wasteTypes}.title`,
  WasteTypesValidationError: 'common.wasteTypesError',
  CancelChipIcon: 'CancelIcon',
  EditButton: 'common.editButton',
  Description: 'editMarkerDialog.description',
  UpdateButton: 'editMarkerDialog.updateButton',
  CancelButton: 'common.cancelButton',
  SuccessMessage: 'markersDomain.updateMarkerSuccessMessage',
  ErrorMessage: 'common.errorTitle. markersDomain.updateMarkerErrorMessage'
};

export const WastyTypeButteriesTitle = `icons.${WasteTypes.Batteries}.title`;

export const LAT_LNG_MOCK = { lat: 1, lng: 2 } as LngLatLike;
