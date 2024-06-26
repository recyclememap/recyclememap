import { MakePartial } from '@common/types';

export enum WasteTypes {
  Packing = 'packing',
  Plastic = 'plastic',
  Batteries = 'batteries',
  Carton = 'carton',
  Clothes = 'clothes',
  Paper = 'paper',
  Glass = 'glass'
}

export enum MarkerProperties {
  position = 'position',
  wasteTypes = 'wasteTypes',
  address = 'address'
}

export type MarkerFormFields = {
  wasteTypes: WasteTypes[];
};

export type NewMarker = {
  position: number[];
  address: string;
} & MarkerFormFields;

export type Marker = {
  id: string;
  position: number[];
  wasteTypes: WasteTypes[];
  address: string;
  date: string;
};

export type SuggestedMarker = MakePartial<Marker>;

export type SuggestedProperties = MakePartial<NewMarker>;

export type MarkersList = Marker[];
