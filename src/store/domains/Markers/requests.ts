import { AxiosRequestConfig } from 'axios';
import { api } from '@api/network';
import { extractResponse } from '@utils/helpers';
import { NewMarker, MarkersList, SuggestedProperties } from './types';

export const markersApi = {
  addNewMarker: (
    data: NewMarker,
    options: AxiosRequestConfig = {}
  ): Promise<void> => {
    return extractResponse(api.post('/markers', data, options));
  },
  getMarkers: (options: AxiosRequestConfig = {}): Promise<MarkersList> => {
    return extractResponse(api.get('/markers', options));
  },
  updateMarker: (
    markerId: string,
    data: SuggestedProperties,
    options: AxiosRequestConfig = {}
  ): Promise<void> => {
    return extractResponse(api.patch(`/markers/${markerId}`, data, options));
  }
};
