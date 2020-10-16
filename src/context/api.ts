import Axios, { AxiosInstance } from 'axios';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import config from '../config';

export const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

export const makeApiContext = (axios: AxiosInstance) => {
  return {
    settings: {
      axios: axios,
      debug: true,
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
