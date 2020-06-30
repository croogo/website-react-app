import Axios, { AxiosRequestConfig } from 'axios';
import { createContext } from 'react';
import config from '../config';

export const ApiContext = createContext({token: '', setToken: (data: string) : void => {}});

export function useApi() {

  const token = '';

  let axiosConfig: AxiosRequestConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Accept': 'application/vnd.api+json',
    },
  };

  if (token) {
    axiosConfig.headers['Authorization'] = `Bearer ${token}`;
  }

  const axios = Axios.create(axiosConfig);

  return {
    Nodes: {
      index: function(config ?: AxiosRequestConfig | undefined) {
        return axios.get('/nodes', config)
      },
    },

    Types: {
      index: function(config ?: AxiosRequestConfig | undefined) {
        return axios.get('/types', config)
      },
    },

    Blocks: {
      index: function(config ?: AxiosRequestConfig | undefined) {
        return axios.get('/blocks', config)
      },

    }

  }
}
