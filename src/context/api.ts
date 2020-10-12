import Axios, { AxiosRequestConfig } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import qs from 'qs';
import { createContext } from 'react';
import config from '../config';
import { ApiIndex } from '../types/entities';

const cache = setupCache({
  maxAge: 5 * 60 * 1000,
  exclude: {
    query: false,
  },
  key: (req: any) => req.url + qs.stringify(req.params),
});

export const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

export const ApiContext = createContext({ token: '', setToken: (data: string): void => { } });

export function useApi() {

  const token = process.env.REACT_APP_API_TOKEN;

  let axiosConfig: AxiosRequestConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Accept': 'application/vnd.api+json',
      'X-ApiToken': token,
    },
    adapter: cache.adapter,
  };

  if (token) {
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
