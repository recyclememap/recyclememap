import { AxiosRequestConfig } from 'axios';
import { nominatimApi, api } from '@api/network';
import { extractResponse } from '@utils/helpers';
import { NewMarker } from './types';

export const mapApi = {
  getAddress: (options: AxiosRequestConfig = {}): Promise<any> => {
    return extractResponse(nominatimApi.get('/reverse', options));
  },
  addNewMarker: (
    data: NewMarker,
    options: AxiosRequestConfig = {}
  ): Promise<void> => {
    return extractResponse(api.post('/markers', data, options));
  }
};
