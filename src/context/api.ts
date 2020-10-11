import Axios, { AxiosRequestConfig } from 'axios';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import { createContext } from 'react';
import config from '../config';
import { ApiIndex } from '../types/entities';

export const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

export const ApiContext = createContext({ token: '', setToken: (data: string): void => { } });

export function useApi() {

  const token = '';

  let axiosConfig: AxiosRequestConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Accept': 'application/vnd.api+json',
      'X-ApiToken': config.api.token,
    },
  };

  if (token) {
    axiosConfig.headers['Authorization'] = `Bearer ${token}`;
  }

  const axios = Axios.create(axiosConfig);

  return {
    Links: {
      index: function (config?: AxiosRequestConfig | undefined) {
        return axios.get<ApiIndex>('/links', config)
      },
    },

    Nodes: {
      index: function (config?: AxiosRequestConfig | undefined) {
        return axios.get<ApiIndex>('/nodes', config)
      },
    },

    Types: {
      index: function (config?: AxiosRequestConfig | undefined) {
        return axios.get<ApiIndex>('/types', config)
      },
    },

    Terms: {
      index: function (config?: AxiosRequestConfig | undefined) {
        return axios.get<ApiIndex>('/terms', config)
      },
    },

    Blocks: {
      index: function (config?: AxiosRequestConfig | undefined) {
        return axios.get<ApiIndex>('/blocks', config)
      },
    }

  }
}
