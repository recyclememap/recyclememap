import { LatLng } from 'leaflet';
import { WasteTypes } from '@common/constants';

export const FormElements = {
  Title: 'addMarkerDialog.title',
  AddressLabel: 'common.addressLabel',
  Address: 'test address',
  WasteTypesDescription: 'common.wasteTypesDescription',
  WasteTypesLabel: 'common.wasteTypesLabel',
  WasteType: `icons.${WasteTypes.Batteries}.title`,
  WasteTypesValidationError: 'common.wasteTypesError',
  CancelChipIcon: 'CancelIcon',
  EditButton: 'common.editButton',
  Description: 'addMarkerDialog.description',
  AddButton: 'addMarkerDialog.addButton',
  CancelButton: 'common.cancelButton',
  SuccessMessage: 'markersDomain.addNewMarkerSuccessMessage',
  ErrorMessage: 'common.errorTitle. markersDomain.addNewMarkerErrorMessage'
};

export const WastyTypeButteriesTitle = `icons.${WasteTypes.Batteries}.title`;

export const LAT_LNG_MOCK = { lat: 1, lng: 2 } as LatLng;
