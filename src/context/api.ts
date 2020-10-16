import Axios, { AxiosInstance } from 'axios';
import config from 'config';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';

export const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

export const makeApiContext = (axios: AxiosInstance) => {
  return {
    settings: {
      axios: axios,
      debug: process.env.NODE_ENV === 'development',
    },
  }
}

export const makeAxios = () => {
  let axiosConfig = {
    baseURL: config.api.baseUrl,
    headers: {
      'Accept': 'application/vnd.api+json',
      'X-ApiToken': config.api.token,
    },
  }
  return Axios.create(axiosConfig);
}
