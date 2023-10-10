import { LatLng } from 'leaflet';
import { WasteTypes } from '@common/constants';

export const DialogElements = {
  Title: 'addMarkerDialog.title',
  AddressLabel: 'addMarkerDialog.addressLabel',
  Address: 'test address',
  WasteTypesDescription: 'addMarkerDialog.wasteTypesDescription',
  WasteTypesLabel: 'addMarkerDialog.wasteTypesLabel',
  WasteType: `icons.${WasteTypes.Batteries}.title`,
  WasteTypesValidationError: 'addMarkerDialog.wasteTypesError',
  CancelChipIcon: 'CancelIcon',
  Description: 'addMarkerDialog.description',
  AddButton: 'addMarkerDialog.addButton',
  CancelButton: 'addMarkerDialog.cancelButton',
  SuccessMessage: 'markersDomain.addNewMarkerSuccessMessage',
  ErrorMessage: 'common.errorTitle. markersDomain.addNewMarkerErrorMessage'
};

export const LAT_LNG_MOCK = { lat: 1, lng: 2 } as LatLng;
