import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

export const ASHDOD_COORDINATES = [31.792, 34.645] as LatLngExpression;
export const ASHDOD_MAX_BOUNDS = [
  [31.85, 34.575],
  [31.758, 34.72]
] as LatLngBoundsExpression;

export const INITIAL_MAP_ZOOM = 13; // Scale 1:13
export const MIN_MAP_ZOOM = 13; // Scale 1:13
export const MAX_MAP_ZOOM = 19; // Scale 1:19

export const MOBILE_DIALOG_HEIGHT = 180;

export const StatusCodes = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  InternalServerError: 500
};
