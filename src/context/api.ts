import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupCache } from 'axios-cache-adapter';
import config from 'config';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import qs from 'qs';
import { CustomContext } from 'react-use-api/build/typings';

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

export const makeApiContext = (axios: AxiosInstance): CustomContext => {
  return {
    settings: {
      axios: axios,
      debug: process.env.NODE_ENV === 'development',
    },
  }
}

export const makeAxios = () => {
  let axiosConfig: AxiosRequestConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Accept': 'application/vnd.api+json',
      'X-ApiToken': config.api.token,
    },
    adapter: cache.adapter,
  }
  return Axios.create(axiosConfig);
}
