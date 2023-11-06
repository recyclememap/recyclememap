import { LatLngTuple } from 'leaflet';

export const ASHDOD_COORDINATES = [31.792, 34.645] as LatLngTuple;

export const INITIAL_MAP_ZOOM = 14; // Scale 1:14
export const MAX_MAP_ZOOM = 19; // Scale 1:19

export const MOBILE_SIDEBAR_HEIGHT = 280;

export const StatusCodes = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  InternalServerError: 500
};

export enum WasteTypes {
  Packing = 'packing',
  Plastic = 'plastic',
  Batteries = 'batteries',
  Carton = 'carton',
  Clothes = 'clothes',
  Paper = 'paper',
  Glass = 'glass'
}

export const AshdodCoordinates = {
  LatMin: 31.752,
  LatMax: 31.862,
  LngMin: 34.613,
  LngMax: 34.703
};

export enum MarkerState {
  Active = 'Active',
  Edit = 'Edit',
  New = 'New'
}
