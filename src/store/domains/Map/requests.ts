import { AxiosRequestConfig } from 'axios';
import { nominatimApi } from '@api/network';
import { extractResponse } from '@utils/helpers';

export const mapApi = {
  getAddress: (options: AxiosRequestConfig = {}): Promise<any> => {
    return extractResponse(nominatimApi.get('/reverse', options));
  }
};
