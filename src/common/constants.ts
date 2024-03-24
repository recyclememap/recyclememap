import { LngLatBoundsLike, LngLatLike } from '@maptiler/sdk';

export const ASHDOD_COORDINATES = [34.643557, 31.795] as LngLatLike;
export const ASHDOD_BOUNDS = [34.53, 31.75, 34.73, 31.85] as LngLatBoundsLike;
export const SEARCH_COUNTRY_NAME = 'IL';

export const INITIAL_MAP_ZOOM = 13.4; // Scale 1:17
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
  Plastic = 'plastic',
  Paper = 'paper',
  Glass = 'glass',
  Carton = 'carton',
  Packing = 'packing',
  Batteries = 'batteries',
  Clothes = 'clothes'
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
